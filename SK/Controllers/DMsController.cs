using SK.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace SK.Controllers
{
    public class DMsController : Controller
    {
        private MyDBEntities db = new MyDBEntities();

        // GET: DMs
        public ActionResult Index()
        {
            return View(db.DM.ToList());
        }

        // GET: DMs/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DM dM = db.DM.Find(id);
            if (dM == null)
            {
                return HttpNotFound();
            }
            return View(dM);
        }

        // GET: DMs/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DMs/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "DId,Name,Description,Popularity")] DM dM, string imgPath)
        {
            if (ModelState.IsValid)
            {
                // 保存图片路径
                dM.Image = imgPath;

                db.DM.Add(dM);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(dM);
        }

        // GET: DMs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DM dM = db.DM.Find(id);
            if (dM == null)
            {
                return HttpNotFound();
            }
            return View(dM);
        }
        // POST: DMs/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(DM dM, string imagePath, bool deleteImage = false)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // 获取数据库中的原始实体
                    var originalDM = db.DM.Find(dM.DId);

                    if (originalDM == null)
                    {
                        return HttpNotFound();
                    }

                    // 处理图片删除
                    if (deleteImage && !string.IsNullOrEmpty(originalDM.Image))
                    {
                        string oldPath = Server.MapPath("~/" + originalDM.Image);
                        if (System.IO.File.Exists(oldPath))
                        {
                            System.IO.File.Delete(oldPath);
                        }
                        dM.Image = null; // 更新实体的图片路径
                    }

                    // 处理新上传的图片
                    if (!string.IsNullOrEmpty(imagePath))
                    {
                        dM.Image = imagePath;
                    }
                    else if (string.IsNullOrEmpty(imagePath) && !deleteImage)
                    {
                        // 如果没有上传新图片且未选择删除，则保留原图片
                        dM.Image = originalDM.Image;
                    }

                    // 更新实体状态
                    db.Entry(originalDM).CurrentValues.SetValues(dM);
                    db.SaveChanges();

                    TempData["SuccessMessage"] = "DM信息更新成功！";
                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "保存时出错: " + ex.Message);
                }
            }
            return View(dM);
        }

        // GET: DMs/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DM dM = db.DM.Find(id);
            if (dM == null)
            {
                return HttpNotFound();
            }
            return View(dM);
        }

        // POST: DMs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            DM dM = db.DM.Find(id);
            db.DM.Remove(dM);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // 图片上传逻辑：使用Image字段名
        [HttpPost]
        public ActionResult UploadImage()
        {
            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];
                if (file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/Uploads/"), fileName);
                    file.SaveAs(path);

                    // 返回Image字段存储的路径
                    var imgUrl = Url.Content("~/Uploads/" + fileName);
                    return Json(new { success = true, url = imgUrl });
                }
            }
            return Json(new { success = false, message = "图片上传失败" });
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