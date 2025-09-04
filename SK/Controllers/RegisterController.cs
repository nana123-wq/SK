using SK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SK.Controllers
{
    public class RegisterController : Controller
    {
        private MyDBEntities db = new MyDBEntities();

        // 注册页面显示动作
        public ActionResult Index()
        {
            return View();
        }

        // 新增：跳转到登录页面的动作
        public ActionResult RedirectToLogin()
        {
            return RedirectToAction("Login", "Login"); // 跳转到Login控制器的Login动作
        }

        // 注册逻辑处理动作
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(RegisterModel model)
        {
            // 检查两次输入密码是否一致
            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("", "两次密码不一致，请重新输入");
                return View(model);
            }

            // 模型验证通过
            if (ModelState.IsValid)
            {
                // 检查账号是否已存在
                if (db.User.Any(u => u.Account == model.Account))
                {
                    ModelState.AddModelError("", "该账号已被注册");
                    return View(model);
                }

                // 对密码进行哈希处理
                string hashedPassword = HashPassword(model.Password);

                // 创建新用户对象
                var newUser = new User
                {
                    Account = model.Account,
                    PassWord = hashedPassword,
                };

                // 将新用户添加到数据库并保存更改
                db.User.Add(newUser);
                db.SaveChanges();

                // 设置注册成功提示信息
                ViewBag.SuccessMessage = "注册成功";
                return View(model);
            }

            // 模型验证不通过，返回注册页面
            return View(model);
        }

        // 密码哈希方法
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(inputBytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
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