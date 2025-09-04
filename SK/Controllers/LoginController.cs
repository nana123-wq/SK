using SK.Models;
using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;

namespace SK.Controllers
{
    public class LoginController : Controller
    {
        private MyDBEntities db = new MyDBEntities();

        // 固定管理员账号信息（用于测试）
        private const string FIXED_ADMIN_ACCOUNT = "Admin";
        private const string FIXED_ADMIN_PASSWORD = "123456";

        // 固定普通用户账号信息（用于测试）
        private const string FIXED_USER_ACCOUNT = "a";
        private const string FIXED_USER_PASSWORD = "123";

        // 显示登录页面
        public ActionResult Login()
        {
            Debug.WriteLine("访问登录页面，当前Session: " + Session["UserId"]);
            return View();
        }

        // 处理登录表单提交
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string account, string password)
        {
            try
            {
                Debug.WriteLine($"登录尝试开始 - 账号: {account}");

                // 1. 基础验证
                if (string.IsNullOrEmpty(account) || string.IsNullOrEmpty(password))
                {
                    ModelState.AddModelError("", "账号和密码不能为空");
                    return View();
                }

                // 2. 检查固定管理员账号（用于测试）
                if (account.Equals(FIXED_ADMIN_ACCOUNT, StringComparison.OrdinalIgnoreCase) &&
                    password == FIXED_ADMIN_PASSWORD)
                {
                    Debug.WriteLine("检测到固定管理员账号，直接验证通过");
                    Session["AdminId"] = -1;
                    Session["Account"] = FIXED_ADMIN_ACCOUNT;
                    Session["UserType"] = "admin";
                    return RedirectToAction("Index", "Users"); // 跳转到管理员首页
                }

                // 3. 检查固定普通用户账号（用于测试）
                if (account.Equals(FIXED_USER_ACCOUNT, StringComparison.OrdinalIgnoreCase) &&
                    password == FIXED_USER_PASSWORD)
                {
                    Debug.WriteLine("检测到固定普通用户账号，直接验证通过");
                    Session["UserId"] = -1; // 使用-1表示固定用户
                    Session["Account"] = FIXED_USER_ACCOUNT;
                    Session["UserType"] = "user";
                    return RedirectToAction("Index", "Home"); // 跳转到用户首页
                }

                // 4. 数据库连接校验
                try
                {
                    var testQuery = db.User.Take(1).ToList();
                    Debug.WriteLine($"数据库连接正常，测试查询结果: {testQuery.Count} 条记录");
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"数据库连接失败！异常: {ex.Message}");
                    ModelState.AddModelError("", "数据库连接异常，请联系管理员");
                    return View();
                }

                // 5. 从User表中查询普通用户
                var user = db.User.FirstOrDefault(u =>
                    u.Account.Equals(account, StringComparison.OrdinalIgnoreCase));

                Debug.WriteLine($"执行查询: SELECT * FROM User WHERE Account = '{account}'");
                Debug.WriteLine($"数据库返回User: {user?.UId} | {user?.Account} | {user?.PassWord}");

                if (user != null)
                {
                    Debug.WriteLine($"找到用户，开始验证密码...");
                    Debug.WriteLine($"输入密码: {password}");
                    Debug.WriteLine($"存储密码: {user.PassWord}");

                    // 对输入的密码进行SHA256哈希处理
                    string hashedInputPassword = HashPassword(password);
                    Debug.WriteLine($"输入密码哈希后: {hashedInputPassword}");

                    // 验证密码（比较哈希后的值）
                    if (user.PassWord == hashedInputPassword)
                    {
                        Session["UserId"] = user.UId;
                        Session["Account"] = user.Account;
                        Session["UserType"] = "user";
                        return RedirectToAction("Index", "Home"); // 跳转到用户首页
                    }

                    ModelState.AddModelError("", "密码错误");
                    return View();
                }

                // 6. 账号不存在
                ModelState.AddModelError("", "该账号不存在");
                return View();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"登录异常: {ex.ToString()}");
                ModelState.AddModelError("", "登录过程发生错误，请重试");
                return View();
            }
        }

        // 密码哈希方法，与注册时保持一致
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(inputBytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }

        // 跳转到注册页面
        public ActionResult RedirectToRegister()
        {
            return RedirectToAction("Index", "Register");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}