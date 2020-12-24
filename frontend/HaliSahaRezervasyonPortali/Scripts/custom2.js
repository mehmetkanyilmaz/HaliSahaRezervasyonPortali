$(function () {
//=================Maç Geçmişi Sayfası Kodları=================================//
    $("#tblMacGecmisi").DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        }
    });
    //bu metod kullanıcının kendi rezervasyonunu silmesi için kullanılır.
    $("#tblMacGecmisi").on("click", ".btnRezervasyonSil", function () {
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
                    var date = btn.data("date");
                    $.ajax({
                        url: '/Home/RezervasyonSil?id=' + id + "&date=" + date,
                        type: "Post",
                        dataType: 'json',
                        async: false,
                        success: function (gelenDeg) {
                            if (gelenDeg == "201") {
                                btn.parent().parent().remove();
                            }
                            else if (gelenDeg == "0") {
                                bootbox.confirm({
                                    title: "Bilgi",
                                    message: "Rezervasyon Son Bir Gün Kalana Kadar İptal Edilebilir!",
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
                                    message: "Rezervasyon Silinememektedir!",
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
    //bu metod kullanıcının rezervasyonunu güncellemesi için kullanılır.
    var id;
    var tarih;
    $("#tblMacGecmisi").on("click", ".btnRezervasyonGuncelle", function () {
        var btn = $(this);
        id = btn.data("id");
        tarih = btn.data("tarih");
        var gun = tarih.split('.')[0];
        if (parseInt(gun) < 10) gun = "0" + gun;
        document.getElementById("dateTime2").value = tarih.split('.')[2] + "-" + tarih.split('.')[1] + "-" + gun;

    });

    function MacGuncelle() {
        var today = new Date();
        if (new Date(tarih) < today) {
            bootbox.confirm({
                title: "Bilgi",
                message: "Tarihi Geçmiş Maçlar Değiştirilemez!",
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
            if (new Date(document.getElementById("dateTime2").value) < today) {
                bootbox.confirm({
                    title: "Bilgi",
                    message: "Geçmiş Tarihe Rezervasyon Yapılamaz!",
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
                var saatler = document.getElementById("matchTime").value;
                $.ajax({
                    url: '/Home/MacSaatiDegistir',
                    type: "Post",
                    dataType: 'json',
                    async: false,
                    data: { _id: id, matchDate: document.getElementById("dateTime2").value, matchStart: saatler.split("-")[0], matchStop: saatler.split("-")[1], stadiumId: document.getElementById("matchStad").value },
                    success: function (gelenDeg) {
                        if (gelenDeg == "205") {
                            bootbox.confirm({
                                title: "Bilgi",
                                message: "İlgili Tarih Saat Ve Stad İçin Rezervasyon Yapılamamaktadır!",
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
                        else if (gelenDeg == "200") {
                            window.location.reload()
                        }
                        else {
                            bootbox.confirm({
                                title: "Hata",
                                message: "Beklenmeyen Bir Hata Oluştu, Lütfen Tekrar Deneyiniz!",
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
    }
    document.getElementById('btnMacGuncelle').addEventListener('click', MacGuncelle, true);

//=================Mac sayfası yüklendiğinde çalışacak kodlar===================//
    $.ajax({
        url: '/Home/Stadlar/',
        type: "Post",
        dataType: 'json',
        async: false,
        success: function (gelenDeg) {
            if (gelenDeg == "404") {
                alert('Stadlar Listelenemedi!');
            }
            else {
                gelenDeg.forEach(function (item) {
                    var select = document.getElementById("matchStad");
                    var option = document.createElement("option");
                    option.text = item.stadiumName;
                    option.value = item._id;
                    select.add(option);
                });

            }
        },
        error: function (err) {
        }
    });   
});