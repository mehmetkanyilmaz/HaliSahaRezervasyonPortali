using HaliSahaRezervasyonPortali.Models;
using HaliSahaRezervasyonPortali.Models.ViewsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace HaliSahaRezervasyonPortali.Controllers
{
    public class AdminController : Controller
    {
        string baseUrl = "http://localhost:3000/api/";
        public ActionResult Index()
        {
            FormsAuthentication.SignOut();
            return View();
        }
        //bu metod rolü A => Admin olan kullanıcıların admin paneline girebilmesi için kullanılır.
        [HttpPost]
        public async Task<ActionResult> Index(userModel user)
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
                    if (readTask.Result.ToList()[0].role == "A")
                    {
                        FormsAuthentication.SetAuthCookie(readTask.Result.ToList()[0]._id, true);
                        return RedirectToAction("Anasayfa", "Admin");
                    }
                    else
                    {
                        ViewBag.mesaj = "Yetkisiz Kullanıcı";
                        return View(user);
                    }
                }
                else
                {
                    ViewBag.mesaj = "Kullanıcı Bilgileri Hatalı";
                    return View(user);
                }

            }
        }
        [Authorize]
        public async Task<ActionResult> Anasayfa()
        {
            return View();
        }
        //bu metod bütün kullanıcıların maçlarını listeler.
        [Authorize]
        public ActionResult MacListesi()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "match/matchUserList");
                var responseTask = client.GetAsync("matchUserList");
                responseTask.Wait();
                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<matchUserViewModel>>();
                    readTask.Wait();
                    return View(readTask.Result);

                }
            }
            return View();
        }
        //bu metod id si gönderilen maç kaydını siler.
        public async Task<JsonResult> MacSil(string id)
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
        //bu metod id si gönderilen maç kaydına ait detayları geri gönderir.
        public async Task<JsonResult> MacDetay(string id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "match/");
                var responseTask = client.GetAsync("matchDetailList/" + id);
                responseTask.Wait();
                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<matchUserViewModel>>();
                    readTask.Wait();
                    return Json(readTask.Result);

                }
                else return Json("404");
            }
        }
        //bu metod rezervasyon yapılabilecek saatlerin bilgilerini listeler
        [Authorize]
        public async Task<ActionResult> MacSaatleri()
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
                    return View(readTask.Result.OrderBy(x => x.startTime));
                }
                else return View("MacSaatleri", "Admin", null);
            }
        }
        //bu metod rezervasyon yapılabilecek saatlerin bilgilerini günceller.
        [HttpPost]
        public async Task<JsonResult> MacSaatiGuncelle(matchTimeModel matchTimeModel)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "matchTime/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "matchTime/matchTimeUpdate",matchTimeModel);

                if (responseTask.IsSuccessStatusCode)
                {
                    return Json("200");
                }
                else return Json("404");
            }
           
        }
        //bu metod stad bilgilerini listeler
        [Authorize]
        public async Task<ActionResult> Stad()
        {
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
                    return View(readTask.Result);
                }
                else return View("Stad", "Admin", null);
            }
        }
        //bu metod ilgili stad bilgilerini günceller
        public async Task<JsonResult> StadGuncelle(stadiumModel stadium)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "stadium/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "stadium/stadiumUpdate", stadium);
                return Json(responseTask.StatusCode);
            }
        }
        //bu metod yeni bir stad ekler
        public async Task<JsonResult> StadEkle(stadiumModel stadium)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "stadium/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage responseTask = await client.PostAsJsonAsync(
                    baseUrl + "stadium/stadiumCreate", stadium);

                if (responseTask.StatusCode == HttpStatusCode.Created)
                {
                    var readTask = responseTask.Content.ReadAsAsync<stadiumModel>();
                    readTask.Wait();
                    return Json(readTask.Result);
                }
                else return Json(responseTask.StatusCode);

            }
        }
        //bu metod ilgili stad kaydını siler.
        public async Task<JsonResult> StadSil(string id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "stadium/");
                var deleteTask = client.DeleteAsync("stadiumDelete/" + id);
                var result = deleteTask.Result;
                return Json(result.StatusCode);
            }
        }
    }
}