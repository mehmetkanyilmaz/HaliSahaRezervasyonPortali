$(function () {
//======================Maç Listesi Sayfası Kodları======================//
    $("#tblMaclar").DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        }
    });
    //bu metod maç kaydını siler.
    $("#tblMaclar").on("click", ".btnSil", function () {
        var btn = $(this);
        bootbox.confirm({
            message: "Maçı Silmek İstediğinize Emin Misiniz?",
            className: "fadeInDown animated",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> İptal'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Onayla'
                }
            },
            callback: function (result) {
                if (result) {
                    var id = btn.data("id");
                    $.ajax({
                        url: '/Admin/MacSil/' + id,
                        type: "Post",
                        dataType: 'json',
                        async: false,
                        success: function (gelenDeg) {
                            if (gelenDeg == "201") {
                                btn.parent().parent().remove();
                            }
                            else {
                                alert("hata");
                            }
                        },
                        error: function (err) {
                        }
                    });
                }
            }
        });
    });
    //bu metod maç kaydına ait detay bilgiyi getirir.
    $("#tblMaclar").on("click", ".btnDetay", function () {
        var btn = $(this);
        var id = btn.data("id");
        $.ajax({
            url: '/Admin/MacDetay/' + id,
            type: "Post",
            dataType: 'json',
            async: false,
            success: function (gelenDeg) {
                if (gelenDeg == "404") {
                    alert("hata");
                }
                else {
                    document.getElementById("lblMusteri").innerHTML = "Müşteri..: " + gelenDeg[0].user.nameAndSurname;
                    document.getElementById("lblTelefon").innerHTML = "Telefon..: " + gelenDeg[0].user.phoneNumber;
                    document.getElementById("lblEMail").innerHTML = "E-Mail ..: " + gelenDeg[0].user.mailAdress;

                    var tarih = new Date(gelenDeg[0].matchDate);

                    document.getElementById("lblTarih").innerHTML = "Tarih.....: " + tarih.toLocaleDateString();
                    document.getElementById("lblSaat").innerHTML = "Saat......: " + gelenDeg[0].matchStart + " - " + gelenDeg[0].matchStop;
                    document.getElementById("lblNot").innerHTML = "Not.......: " + gelenDeg[0].note;
                    document.getElementById("lblServis").innerHTML = "Servis....: " + (gelenDeg[0].service == true ? "Var" : "Yok");

                    document.getElementById("lblStad").innerHTML = "Stad.....: " + gelenDeg[0].stad.stadiumName;
                }
            },
            error: function (err) {
            }
        });
    });

//=======================Maç Saatleri Sayfası kodları===================//
    $("#tblMacSaatleri").DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        }
    });
    //bu metod rezervasyon yapılabilecek saatlerin bilgilerini günceller.
    $("#tblMacSaatleri").on("click", ".btnKaydet", function () {
        var btn = $(this);
        bootbox.confirm({
            message: "Bilgileri Güncellemek İstediğinize Emin Misiniz?",
            className: "fadeInDown animated",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> İptal'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Onayla'
                }
            },
            callback: function (result) {
                if (result) {
                    var id = btn.data("id");
                    $.ajax({
                        url: '/Admin/MacSaatiGuncelle/',
                        type: "Post",
                        dataType: 'json',
                        async: false,
                        data: { _id: id, startTime: btn.data("val1"), stopTime: btn.data("val2"), matchPrice: document.getElementById("tbxMatch" + id).value, servicePrice: document.getElementById("tbxService" + id).value, status: document.getElementById("drpStatus" + id).value },
                        success: function (gelenDeg) {
                            if (gelenDeg == "404") {
                                alert('Hata');
                            }
                        },
                        error: function (err) {
                        }
                    });
                }
            }
        });
    });

//========================Stad Sayfası Kodları==========================//
    $("#tblStadlar").DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        }
    });
    //bu metod stad bilgilerini günceller
    $("#tblStadlar").on("click", ".btnStadGuncelle", function () {
        var btn = $(this);
        bootbox.confirm({
            title:"Bilgi",
            message: "Bilgileri Güncellemek İstediğinize Emin Misiniz?",
            className: "fadeInDown animated",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Hayır'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Evet'
                }
            },
            callback: function (result) {
                if (result) {
                    var id = btn.data("id");
                    $.ajax({
                        url: '/Admin/StadGuncelle/',
                        type: "Post",
                        dataType: 'json',
                        async: false,
                        data: { _id: id, stadiumName: document.getElementById("tbxStadName" + id).value, stadStatus: document.getElementById("drpStatus" + id).value },
                        success: function (gelenDeg) {
                            if (gelenDeg == "205") {
                                bootbox.confirm({
                                    title: "Hata",
                                    message: "Bu Stad Adı Daha Önce Kullanılmış!",
                                    buttons: {
                                        cancel: {
                                            label: '<i class="fa fa-times"></i> Kapat'
                                        },
                                        confirm: {
                                            label: '<i class="fa fa-check"></i> Tamam'
                                        }
                                    },
                                    callback: function (result) {

                                    }
                                });
                            }
                            else if (gelenDeg == "400" || gelenDeg == "404") {
                                bootbox.confirm({
                                    title: "Hata",
                                    message: "Güncelleme İşlemi Başarısız!",
                                    buttons: {
                                        cancel: {
                                            label: '<i class="fa fa-times"></i> Kapat'
                                        },
                                        confirm: {
                                            label: '<i class="fa fa-check"></i> Tamam'
                                        }
                                    },
                                    callback: function (result) {

                                    }
                                });
                            }
                        },
                        error: function (err) {
                        }
                    });
                }
            }
        });
    });
    //bu metod stad siler.
    $("#tblStadlar").on("click", ".btnStadSil", function () {
        var btn = $(this);
        bootbox.confirm({
            message: "Stadı Silmek İstediğinize Emin Misiniz?",
            className: "fadeInDown animated",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> İptal'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Onayla'
                }
            },
            callback: function (result) {
                if (result) {
                    var id = btn.data("id");
                    $.ajax({
                        url: '/Admin/StadSil/' + id,
                        type: "Post",
                        dataType: 'json',
                        async: false,
                        success: function (gelenDeg) {
                            if (gelenDeg == "200") {
                                btn.parent().parent().remove();
                            }
                            else if (gelenDeg == "205") {
                                bootbox.confirm({
                                    title: "Hata",
                                    message: "Bu Stada Kayıtlı Maç Var!",
                                    buttons: {
                                        cancel: {
                                            label: '<i class="fa fa-times"></i> Kapat'
                                        },
                                        confirm: {
                                            label: '<i class="fa fa-check"></i> Tamam'
                                        }
                                    },
                                    callback: function (result) {

                                    }
                                });
                            }
                            else {
                                bootbox.confirm({
                                    title: "Hata",
                                    message: "Stad Bulunamadı!",
                                    buttons: {
                                        cancel: {
                                            label: '<i class="fa fa-times"></i> Kapat'
                                        },
                                        confirm: {
                                            label: '<i class="fa fa-check"></i> Tamam'
                                        }
                                    },
                                    callback: function (result) {

                                    }
                                });
                            }
                        },
                        error: function (err) {
                        }
                    });
                }
            }
        });
    });
    //bu metod yeni bir stad ekler.
    $("#ekleDiv").on("click", ".btnStadEkle", function () {
        var stdName = document.getElementById("tbxStadN").value;
        if (stdName == undefined || stdName == null || stdName == "") {
            bootbox.alert({
                title:"Bilgi",
                message: "Stad Adı Boş Geçilemez!"
                });
        }
        else {
            bootbox.confirm({
                title: "Bilgi",
                message: "Yeni Stad Oluşturmak İstediğinize Emin Misiniz?",
                className: "fadeInDown animated",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Hayır'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Evet'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $.ajax({
                            url: '/Admin/StadEkle/',
                            type: "Post",
                            dataType: 'json',
                            async: false,
                            data: {
                                stadiumName: document.getElementById("tbxStadN").value, stadStatus: document.getElementById("drpS").value
                            },
                            success: function (gelenDeg) {
                                if (gelenDeg == "205") {
                                    bootbox.confirm({
                                        title: "Hata",
                                        message: "Bu Stad Adı Daha Önce Kullanılmış!",
                                        buttons: {
                                            cancel: {
                                                label: '<i class="fa fa-times"></i> Kapat'
                                            },
                                            confirm: {
                                                label: '<i class="fa fa-check"></i> Tamam'
                                            }
                                        },
                                        callback: function (result) {

                                        }
                                    });
                                }
                                else if (gelenDeg == "404" || gelenDeg == "400") {
                                    bootbox.confirm({
                                        title: "Hata",
                                        message: "Güncelleme İşlemi Başarısız!",
                                        buttons: {
                                            cancel: {
                                                label: '<i class="fa fa-times"></i> Kapat'
                                            },
                                            confirm: {
                                                label: '<i class="fa fa-check"></i> Tamam'
                                            }
                                        },
                                        callback: function (result) {

                                        }
                                    });
                                }
                                else {
                                    var textbox = "<input class='form-control' id='tbxStadName" + gelenDeg._id + "' name='[0].stadiumName' type='text' value='" + gelenDeg.stadiumName + "'>";
                                    var dropdown = "";
                                    if (gelenDeg.stadStatus) dropdown = "<select class='form-control' data-val='true' data-val-required='Stad Durum alanı gereklidir.' id='drpStatus" + gelenDeg._id + "' name='[3].stadStatus'><option selected='selected' value='true'>Açık</option> <option value= 'false'>Kapalı</option></select>";
                                    else dropdown = "<select class='form-control' data-val='false' data-val-required='Stad Durum alanı gereklidir.' id='drpStatus" + gelenDeg._id + "' name='[3].stadStatus'><option value='true'>Açık</option> <option selected='selected' value= 'false'>Kapalı</option></select>";

                                    var btnGuncelle = "<a class='btn btn-info btn-block btnStadGuncelle' data-id='" + gelenDeg._id + "'><span class='glyphicon glyphicon-floppy-saved'></span></a>";

                                    var btnSil = "<a class='btn btn-danger btn-block btnStadSil' data-id='" + gelenDeg._id + "'><span class='glyphicon glyphicon-trash'></span></a>";

                                    $('#tblStadlar > tbody:last-child').append("<tr><td>" + textbox + "</td><td>" + dropdown + "</td><td>" + btnGuncelle + "</td><td>" + btnSil + "</td></tr>");
                                }
                            },
                            error: function (err) {
                            }
                        });
                    }
                }
            });
        }
    });
});