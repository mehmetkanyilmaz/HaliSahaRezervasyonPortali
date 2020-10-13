const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const WorkOrderSchema=new Schema({
    customerId:{//hangi müşteri için iş emri açıldığını tutar
        type:String,
        required:true
    },
    customerProductId:{//müşterinin hangi ürünü için iş emri açıldığını tespit etmek için kul.
        type:String,
        required:true
    },
    requestTypeId:{//iş emri için isteğin nasıl geldiği (telefon,mail...vs)
        type:String,
        required:true
    },
    userId:{//işi yapacak olan kullanıcı
        type:String,
        required:true
    },
    requestUserId:{//iş emrini(isteği) alan kullanıcı. Her zaman işi yapacak kişi olmayabilir
        type:String,
        required:true
    },
    statedFaulId:{//belirtilen arıza
        type:String,
        required:false
    },
    detectedFaultId:{//tespit edilen arıza
        type:String,
        required:false
    },
    explanation:{//arıza açıklaması
        type:String,
        required:false,
        maxlength:256
    },
    done:{//yapılan işlemler
        type:String,
        required:false,
        maxlength:512
    },
    serviceStatusId:{//servisin hangi durumda olduğunu gösterir(teknik servis,hazır,parça bekliyor...vs)
        type:String,
        required:false
    },
    startDate:{//iş başlangıç tarihi
        type:Date,
        default:Date.now
    },
    finishDate:{//iş bitiş tarihi
        type:Date,
        required:false
    },
    wordOrderStatus:{//iş emrinin durumunu gösterir. true iş emri açık, false iş emri kapalı
        type:Boolean,
        required:true,
        default:true
    },
    workOrderAccessory:[{//iş emrine kayıtlı aksesuarları tutan liste
        accessoryId:{//ilgili aksesuarın id si
            type:String,
        },
        accessoryUserId:{//aksusuarı ekleyen kullanıcı
            type:String
        }
    }],
    workmanship:[{//iş emrine kayıtlı işçilik listesi
        workmanshipId:{//ilgili işçilik id si
            type:String
        },
        workmanshipCost:{//işçilik ücreti
            type:Number,
            default:0
        },
        laborCost:{//işçilik maliyeti
            type:Number,
            default:0
        },
        workmanshipUserId:{//işçiliği sisteme ekleyen kullanıcı
            type:String
        }
    }],
    workmanshipProcess:[{//iş emrine kayıtlı işlemleri tutar
        userId:{
            type:String,
        },
        startDate:{
            type:Date
        },
        finishDate:{
            type:Date
        }

    }]
},{collection:'workorder'});

module.exports=mongoose.model('workorder',WorkOrderSchema);