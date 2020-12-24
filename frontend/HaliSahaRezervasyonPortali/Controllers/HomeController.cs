using HaliSahaRezervasyonPortali.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using HaliSahaRezervasyonPortali.Models.ViewsModel;
using System.Net;

namespace HaliSahaRezervasyonPortali.Controllers
{
    public class HomeController : Controller
    {
        string baseUrl = "http://localhost:3000/api/";
        public ActionResult Index()
        {
            return View();
        }
        //bu metod aktif olan stadları geri gönderir.
        public JsonResult Stadlar()
        {
            try
            {
                //WorkOrderViewModel workOrder = new WorkOrderViewModel();
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl + "stadium/stadiumList");
                    var responseTask = client.GetAsync("stadiumList");
                    responseTask.Wait();
                    var result = responseTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<IList<stadiumModel>>();
                        readTask.Wait();
                        return Json(readTask.Result.Where(x => x.stadStatus == true));
                    }
                }
            }
            catch { /*return RedirectToAction("Cikis", "Home");*/ }
            return Json("404");
        }
        //bu metod sistemde tanımlı olan ve rezervasyon yapılabilecek maç saatlerini gönderir.
        public async Task<JsonResult> SaatleriGetir()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "matchTime/matchTimeList");
                var responseTask = client.GetAsync("matchTimeList");
                responseTask.Wait();
                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<matchTimeModel>>();
                    readTask.Wait();
                    return Json(readTask.Result.OrderBy(x => x.startTime));
                }
                else return Json("404");
            }

        }
        //bu metod kullanıcıların almış olduğu rezervasyon saatlerini gönderir
        public async Task<JsonResult> MacSaatleriniGetir(matchModel matchModel)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "match/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "match/matchList", matchModel);

                if (responseTask.IsSuccessStatusCode)
                {
                    var readTask = responseTask.Content.ReadAsAsync<IList<matchModel>>();
                    readTask.Wait();
                    return Json(readTask.Result);
                }
                else return Json("404");
            }
        }
        //bu metod kullanıcının oturum açması için kullanılır.
        public async Task<JsonResult> Login(userModel user)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "user/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "user/userLogin", user);

                if (responseTask.IsSuccessStatusCode)
                {
                    var readTask = responseTask.Content.ReadAsAsync<IList<userModel>>();
                    readTask.Wait();

                    Session["mail"] = readTask.Result.ToList()[0].mailAdress;
                    Session["sifre"] = readTask.Result.ToList()[0].password;
                    Session["userId"] = readTask.Result.ToList()[0]._id;

                    return Json("200");
                }
                else return Json("404");
            }
        }
        //bu metod kullanıcının oturum kapatması için kullanılır.
        public JsonResult Logout()
        {
            try
            {
                Session.Abandon();
                return Json("200");
            }
            catch { return Json("404"); }
        }
        //bu metod ödeme bilgileri başarılı ise yeni bir rezervasyoın kaydı oluşturur.
        public async Task<JsonResult> OdemeYap(matchModel match)
        {//bu projede ödeme işlemi baypas edilmiştir.
            using (var client = new HttpClient())
            {
                match.userId = Session["userId"].ToString();
                client.BaseAddress = new Uri(baseUrl + "match/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "match/matchCreate", match);

                if (responseTask.IsSuccessStatusCode)
                {
                    return Json("200");
                }
                else return Json("404");
            }
        }
        //bu metod yeni kullanıcı oluşturur.
        public async Task<JsonResult> YeniKullanici(userModel user)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(baseUrl + "user/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "user/userCreate", user);

                if (responseTask.StatusCode == HttpStatusCode.OK)
                {
                    var readTask = responseTask.Content.ReadAsAsync<userModel>();
                    readTask.Wait();
                    Session["mail"] = readTask.Result.mailAdress.ToString();
                    Session["sifre"] = readTask.Result.password.ToString();
                    Session["userId"] = readTask.Result._id.ToString();
                    return Json("200");
                }
                else if (responseTask.StatusCode == HttpStatusCode.ResetContent) return Json("205");
                else return Json("404");
            }
        }
        //kullanıcının profil sayfasıdır. Kullanıcı bilgileri listelenir.
        public async Task<ActionResult> Profil()
        {
            if (Session["mail"] == "" || Session["mail"] == null || Session["sifre"] == "" || Session["sifre"] == null || Session["userId"] == "" || Session["userId"] == null)
            {//oturum kapalı ise profil sayfasını açmaması için
                return RedirectToAction("Index", "Home");
            }
            else
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl + "user/");
                    var responseTask = client.GetAsync("userListOne/" + Session["userId"]);
                    responseTask.Wait();
                    var result = responseTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<userModel>();
                        readTask.Wait();
                        return View(readTask.Result);
                    }
                    else return RedirectToAction("Index", "Home");
                }
            }
        }
        //bu metod kullanıcının bilgilerini güncellemek için kullanılır.
        [HttpPost]
        public async Task<ActionResult> Profil(userModel user)
        {
            if (Session["mail"] == "" || Session["mail"] == null || Session["sifre"] == "" || Session["sifre"] == null || Session["userId"] == "" || Session["userId"] == null)
            {//oturum kapalı ise profil sayfasını açmaması için
                return RedirectToAction("Index", "Home");
            }
            else
            {
                if (!ModelState.IsValid)
                {
                    return View(user);
                }
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl + "user/");
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                        baseUrl + "user/userUpdate", user);

                    if (responseTask.StatusCode == HttpStatusCode.OK)
                    {
                        var readTask = responseTask.Content.ReadAsAsync<userModel>();
                        readTask.Wait();
                        Session["mail"] = readTask.Result.mailAdress.ToString();
                        Session["sifre"] = readTask.Result.password.ToString();
                        ViewBag.islem = "İşlem Başarılı";
                        return View(user);
                    }
                    else if (responseTask.StatusCode == HttpStatusCode.ResetContent)
                    {
                        ViewBag.mesaj = "Mail adresi mevcut";
                        return View(user);
                    }
                    else
                    {
                        ViewBag.islem = "İşlem Başarısız";
                        return View(user);
                    }
                }
            }
        }
        //kullanıcının maçlarının listelendiği sayfadır.
        public async Task<ActionResult> Mac()
        {
            if (Session["mail"] == "" || Session["mail"] == null || Session["sifre"] == "" || Session["sifre"] == null || Session["userId"] == "" || Session["userId"] == null)
            {//oturum kapalı ise profil sayfasını açmaması için
                return RedirectToAction("Index", "Home");
            }
            else
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl + "match/matchUserList");
                    var responseTask = client.GetAsync("matchUserList");
                    responseTask.Wait();
                    var result = responseTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<IEnumerable<matchUserViewModel>>();
                        readTask.Wait();
                        var model = readTask.Result.Where(x => x.user._id == Session["userId"].ToString());
                        return View(model);
                    }
                    else return View();
                }
            }

        }
        //bu metod kullanıcının rezervasyonlarını siler.
        public async Task<JsonResult> RezervasyonSil(string id, DateTime date)
        {
            if (date.Date <= DateTime.Now)
            {//rezervasyon son bir gün kalana kadar silinebilecek.
                return Json("0");
            }
            else
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl + "match/");
                    var deleteTask = client.DeleteAsync("matchDelete/" + id);
                    var result = deleteTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return Json("201");
                    }
                    else return Json("404");
                }
            }
        }
        //bu metod kullanıcının rezervasyon saatini değiştirmesi için kullanılır.
        public async Task<JsonResult> MacSaatiDegistir(matchModel match)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "match/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "match/matchTimeUpdate", match);
                return Json(responseTask.StatusCode);
            }
        }
    }
}