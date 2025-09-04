using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Optimization;
using SK.Models;

namespace SK.Controllers
{
    public class ScriptsController : Controller
    {
        private MyDBEntities db = new MyDBEntities();


        // GET: 全部剧本视图
        public ActionResult AllScripts()
        {
            var scripts = db.Script
                .OrderByDescending(s => s.StarLevel)
                .ToList();
            return View(scripts);
        }

        // 图片上传方法
        [HttpPost]
        public ActionResult UploadImage(HttpPostedFileBase file)
        {
            try
            {
                if (file == null || file.ContentLength == 0)
                    return Json(new { success = false, message = "请选择文件" });

                // 验证文件类型
                var allowedTypes = new[] { "image/jpeg", "image/png", "image/gif" };
                if (!allowedTypes.Contains(file.ContentType.ToLower()))
                    return Json(new { success = false, message = "仅支持 JPG/PNG/GIF 格式" });

                // 创建上传目录
                string uploadDir = "~/Uploads/";
                string physicalPath = Server.MapPath(uploadDir);

                if (!Directory.Exists(physicalPath))
                    Directory.CreateDirectory(physicalPath);

                // 生成唯一文件名
                string fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                string filePath = Path.Combine(physicalPath, fileName);

                // 保存文件
                file.SaveAs(filePath);

                // 返回相对路径
                string relativePath = Url.Content(Path.Combine(uploadDir, fileName)).Replace("\\", "/");
                return Json(new { success = true, url = relativePath });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "上传失败: " + ex.Message });
            }
        }

        // GET: 剧本列表
        public ActionResult Index()
        {
            return View(db.Script.ToList());
        }

        // GET: 剧本详情
        public ActionResult Details(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            Script script = db.Script.Find(id);
            if (script == null)
                return HttpNotFound();

            return View(script);
        }

        // GET: 创建剧本
        public ActionResult Create()
        {          
            return View();
        }

        // POST: 创建剧本
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SId,Title,Type,Content,Describe,StarLevel")] Script script, string imgPath)
        {


            if (ModelState.IsValid)
            {
                // 保存图片路径
                script.img = imgPath;

                db.Script.Add(script);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(script);
        }

        // GET: 编辑剧本
        public ActionResult Edit(int id)
        {
            Script script = db.Script.Find(id);
            if (script == null)
                return HttpNotFound();

            ViewBag.CurrentImage = script.img;
            return View(script);
        }

        // POST: 编辑剧本
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Script script, string imgPath, bool deleteImage = false)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // 处理图片删除
                    if (deleteImage && !string.IsNullOrEmpty(script.img))
                    {
                        string oldPath = Server.MapPath(script.img);
                        if (System.IO.File.Exists(oldPath))
                            System.IO.File.Delete(oldPath);

                        script.img = null;
                    }

                    // 处理新图片
                    if (!string.IsNullOrEmpty(imgPath))
                        script.img = imgPath;

                    db.Entry(script).State = EntityState.Modified;
                    db.SaveChanges();

                    TempData["SuccessMessage"] = "剧本更新成功！";
                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "保存时出错: " + ex.Message);
                }
            }
            return View(script);
        }

        // GET: 删除剧本
        public ActionResult Delete(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            Script script = db.Script.Find(id);
            if (script == null)
                return HttpNotFound();

            return View(script);
        }

        // POST: 删除剧本
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Script script = db.Script.Find(id);

            // 删除关联的图片
            if (!string.IsNullOrEmpty(script.img))
            {
                string imagePath = Server.MapPath(script.img);
                if (System.IO.File.Exists(imagePath))
                    System.IO.File.Delete(imagePath);
            }

            db.Script.Remove(script);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();

            base.Dispose(disposing);
        }
    }
}