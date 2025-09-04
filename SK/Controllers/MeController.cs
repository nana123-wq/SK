using SK.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace SK.Controllers
{
    public class MeController : Controller
    {
        private MyDBEntities db = new MyDBEntities();

        // GET: 个人中心首页
        public ActionResult Index()
        {
            // 检查用户是否已登录
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Login");
            }

            int userId = Convert.ToInt32(Session["UserId"]);
            var user = db.User.Find(userId);

            if (user == null)
            {
                return HttpNotFound();
            }

            // 设置视图数据
            ViewBag.UserId = user.UId;          // 用户ID
            ViewBag.Account = user.Account;      // 用户账号
            ViewBag.Avatar = "/img/1.jpg";      // 默认头像（根据现有视图代码）

            return View();
        }

        // GET: 修改密码页面
        public ActionResult ChangePassword()
        {
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Login");
            }
            return View();
        }

        // POST: 处理修改密码请求
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ChangePassword(string oldPassword, string newPassword, string confirmPassword)
        {
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Login");
            }

            int userId = Convert.ToInt32(Session["UserId"]);
            var user = db.User.Find(userId);

            if (user == null)
            {
                return HttpNotFound();
            }

            // 验证旧密码
            string hashedOldPassword = HashPassword(oldPassword);
            if (user.PassWord != hashedOldPassword)
            {
                ModelState.AddModelError("oldPassword", "旧密码不正确");
                return View();
            }

            // 验证新密码
            if (string.IsNullOrEmpty(newPassword))
            {
                ModelState.AddModelError("newPassword", "新密码不能为空");
                return View();
            }

            if (newPassword != confirmPassword)
            {
                ModelState.AddModelError("confirmPassword", "两次输入的新密码不一致");
                return View();
            }

            // 更新密码
            user.PassWord = HashPassword(newPassword);
            db.SaveChanges();

            ViewBag.Success = "密码修改成功";
            return View();
        }

        // 密码哈希方法
        private string HashPassword(string password)
        {
            using (System.Security.Cryptography.SHA256 sha256 = System.Security.Cryptography.SHA256.Create())
            {
                byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(inputBytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }

        // GET: 编辑个人资料
        public ActionResult EditProfile()
        {
            // 检查用户是否已登录
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Login");
            }

            int userId = Convert.ToInt32(Session["UserId"]);
            var user = db.User.Find(userId);

            if (user == null)
            {
                return HttpNotFound();
            }

            // 创建视图模型，将Account值赋给Nickname属性
            var viewModel = new EditProfileViewModel
            {
                Nickname = user.Account,           // 使用数据库中的Account作为昵称默认值
                Signature = "这个人很懒，什么也没留下..."  // 默认签名（根据现有视图代码）
            };

            // 设置头像（根据现有视图代码）
            ViewBag.Avatar = "/img/1.jpg";

            return View(viewModel);
        }

        // POST: 处理编辑个人资料请求
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditProfile(EditProfileViewModel model)
        {
            // 检查用户是否已登录
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Login");
            }

            int userId = Convert.ToInt32(Session["UserId"]);
            var user = db.User.Find(userId);

            if (user == null)
            {
                return HttpNotFound();
            }

            if (ModelState.IsValid)
            {
                // 由于数据库中没有Nickname字段，这里不执行实际更新
                // 可以考虑添加提示或日志记录用户尝试修改昵称的行为
                TempData["Message"] = "由于系统限制，暂时无法修改昵称。";

                // 处理头像上传（如果有）
                // 由于没有Avatar字段，这里也无法保存

                return RedirectToAction("Index", "Me"); // 保存后跳回个人中心
            }

            // 设置头像（根据现有视图代码）
            ViewBag.Avatar = "/img/1.jpg";

            return View(model); // 验证失败，返回编辑页显示错误
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