/* beautify preserve:start */
const __addAddress      = 'Householder.addAddress'; //新增地址
const __createAddress   = 'Householder.createAddress'; //建立地址
const __addressTitle    = 'Householder.addressTitle'; //住宅地址 (必填)
const __editAddress     = 'Householder.editAddress'; //編輯地址
const __address         = 'common.address';//地址
const __addressState    = 'address.state'; //國省市區
const __floor           = 'address.floor'; //樓層
const __room            = 'address.room'; //室別
const __section         = 'address.section'; //期別
const __building        = 'address.building'; //棟別
const __addressMore     = 'address.addressMore'; //更多地址資訊
const __addressPreview  = 'address.addressPreview'; //地址預覽
const __road            = 'address.road'; //路
const __road1           = 'address.road1';
const __floor1          = 'address.floor1';
const __room1           = 'address.room1';
const __section1        = 'address.section1';
const __building1       = 'address.building1';
const __addressError    = 'address.error'; //已存在相同地址
const __addAccount      = 'Householder.addAccount';//新增住戶帳號
const __createAccount   = 'Householder.createAccount';//建立帳號
const __detactAccount   = 'account.detactAccount';//檢查帳號
const __accountTitle    = 'account.accountTitle';//登入帳號 (必填，可擇一)
const __accountTitle2   = 'account.accountTitle2';//登入帳號
const __mainTel         = 'common.mainTel';//主要電話
const __mainEmail       = 'common.mainEmail';//主要電郵
const __accountInfo     = 'account.accountInfo';//帳戶資訊 (必填)
const __profile         = 'account.profile';//個人資訊
const __name            = 'common.name';//姓名
const __identity        = 'common.identity';//身份
const __gender          = 'common.gender';//性別
const __birthday        = 'common.birthday';//出生日期
const __moreContact     = 'account.moreContact';//更多聯絡資訊
const __subTel          = 'account.subTel';//次要電話
const __subEmail        = 'account.subEmail';//次要電郵
const __sendInvite      = 'account.sendInvite';//發送邀請
const __accuntGroup     = 'account.groups';//隸屬管理群組

const __householderInfo = 'account.householderInfo';//住戶資訊
const __addressInfo     = 'account.addressInfo';//地址資訊
const __newAddandId     = 'account.newAddandId';//新增住址與身份
const __loginAccount    = 'account.loginAccount';//登入帳號

const __pageTitle       = 'page.pageTitle';//新增周邊名冊
const __pageEdit        = 'page.pageEdit';//編輯周邊名冊
const __createPage      = 'page.createPage';//建立名冊
const __baseInfo        = 'page.baseInfo';//基本資料
const __title           = 'common.title';//名稱
const __group           = 'common.group';//群組
const __link            = 'common.link';//網址
const __info            = 'common.info';//相關資訊
const __telphone        = 'common.telphone';//電話
const __comment         = 'common.comment';//備註
const __save            = 'common.save';//儲存變更

const __operatorTitle   = 'operator.operatorTitle';//新增管理人員帳號
const __operatorEdit    = 'operator.operatorEdit'; //編輯管理人員帳號

const __homeLeader      = 'common.homeLeader';//戶長
const __homeMember      = 'common.homeMember';//成員
const __male            = 'common.male';//男性
const __female          = 'common.female';//女性
const __fix             = 'announce.fix';//公共維修
const __record          = 'announce.record';//會議記錄
const __activity        = 'announce.activity';//社區活動

const __open            = 'common.open';//打開
const __close           = 'common.close';//關閉

const __paymentSetting  = 'payment.paymentSetting'; //社區管理費帳單設定
const __savePayment     = 'payment.savePayment'; //儲存帳單設定
const __billing         = 'payment.billing'; //計費方式
const __billSetting     = 'payment.billSetting'; //帳單設定
const __amount          = 'payment.amount'; //金額
const __amountUnit      = 'payment.amountUnit'; //元
const __unitPrice       = 'payment.unitPrice'; //單價
const __unitPriceUnit   = 'payment.unitPriceUnit'; //元/平方米
const __paymentLimit    = 'payment.paymentLimit'; //繳費期限
const __day             = 'payment.day';//天

const __addCyclePlan    = 'payment.addCyclePlan'; //新增週期方案
const __planContent     = 'payment.planContent'; //方案內容
const __planName        = 'payment.planName'; //方案名稱
const __payCycle        = 'payment.planCycle'; //收費週期
const __payCycleUnit    = 'payment.payCycleUnit'; //個月自動發送帳單
const __planDiscount    = 'payment.planDiscount'; //方案折扣
const __allAmount       = 'payment.allAmount'; //總金額費用
const __amountDiscount  = 'payment.amountDiscount'; //總金額折抵
const __discountExplan  = 'payment.discountExplan'; //折扣說明
const __savePlan        = 'payment.savePlan'; //儲存方案

const __newBill         = 'payment.newBill';//新增帳單
const __createBill      = 'payment.createBill';//建立帳單
const __billType        = 'payment.billType';//帳單類型

const __onceManually    = 'payment.onceManually';//單次手動發送
const __cycleAuto       = 'payment.cycleAuto';//週期自動發送


const __selectAddress   = 'payment.selectAddress'; //指派帳單至地址
const __billPlanContent = 'payment.billPlanContent'; //帳單方案內容
const __billName        = 'payment.billName'; //帳單名稱
const __designateAddrees= 'payment.designateAddrees'; //指派地址
const __billDate        = 'payment.billDate'; //出帳日
const __billDateText1   = 'payment.billDateText1'; //出帳該月
const __billDateText2   = 'payment.billDateText2'; //號派送帳單
const __confirmDesignate= 'payment.confirmDesignate'; //確定指派

// form 此表單有的欄位
// required 必填欄位
// section 表單格式
// section > errorButton --> 遇到失敗按鈕顯示的文字
// section > type        --> 表單的類別  add/edit
// section > havePic     --> 有無圖示


// delete 表單該刪除的欄位


/* beautify preserve:end */


module.exports = {
    detactAccount: {
        form: {
            mobile: "",
            email: ""
        },
        required: [{ selectOne: ['mobile', 'email'] }],
        delete: [],
        section: {
            title: __addAccount, //新增住戶帳號
            type: "add",
            button: __detactAccount, //檢查帳號
            havePic: false,
            content: [{
                title: __accountTitle, //登入帳號 (必填，可擇一)
                field: [{
                    text: __mainTel, //主要電話
                    type: "InputField",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail, //主要電郵
                    type: "InputField",
                    key: "email",
                    comment: ""
                }]
            }]
        }
    },
    addOneAddress: {
        form: {
            address: "",
            floor: "",
            room: "",
            section: "",
            building: ""
        },
        required: ['address', 'floor', 'room'],
        delete: ['previewAddress'],
        section: {
            title: __addAddress, //新增地址
            button: __createAddress, //建立地址,
            errorButton: __addressError,
            type: "add",
            havePic: false,
            content: [{
                title: __addressTitle, //住宅地址 (必填)
                field: [{
                    text: __addressState, //國省市區
                    type: "ShowString",
                    key: "contry",
                    comment: ""
                }, {
                    text: __road, //路
                    type: "InputField",
                    key: "address",
                    comment: __road1
                }, {
                    text: __floor, //樓層
                    type: "InputField",
                    key: "floor",
                    comment: __floor1 //樓
                }, {
                    text: __room, //室別
                    type: "InputField",
                    key: "room",
                    comment: __room1 //室
                }]
            }, {
                title: __addressMore,
                field: [{
                    text: __section, //期別
                    type: "InputField",
                    key: "section",
                    comment: __section1 //期
                }, {
                    text: __building, //棟別
                    type: "InputField",
                    key: "building",
                    comment: __building1 //棟
                }]
            }, {
                title: __addressPreview,
                field: [{
                    text: __address, //期別
                    type: "ShowString",
                    key: "previewAddress",
                    comment: ""
                }]
            }]
        }
    },
    editOneAddress: {
        form: {
            address: "",
            floor: "",
            room: "",
            section: "",
            building: ""
        },
        required: ['address', 'floor', 'room'],
        delete: ['previewAddress'],
        section: {
            title: __editAddress, //編輯地址
            button: __editAddress, //編輯地址,
            errorButton: __addressError,
            type: "edit",
            havePic: false,
            content: [{
                title: __addressTitle, //住宅地址 (必填)
                field: [{
                    text: __addressState, //國省市區
                    type: "ShowString",
                    key: "contry",
                    comment: ""
                }, {
                    text: __road, //路
                    type: "InputField",
                    key: "address",
                    comment: __road1
                }, {
                    text: __floor, //樓層
                    type: "InputField",
                    key: "floor",
                    comment: __floor1 //樓
                }, {
                    text: __room, //室別
                    type: "InputField",
                    key: "room",
                    comment: __room1 //室
                }]
            }, {
                title: __addressMore,
                field: [{
                    text: __section, //期別
                    type: "InputField",
                    key: "section",
                    comment: __section1 //期
                }, {
                    text: __building, //棟別
                    type: "InputField",
                    key: "building",
                    comment: __building1 //棟
                }]
            }, {
                title: __addressPreview,
                field: [{
                    text: __address, //期別
                    type: "ShowString",
                    key: "previewAddress",
                    comment: ""
                }]
            }]
        }
    },
    haveAddress: {
        form: {
            department_id: "",
            account_name: "",
            mobile: "",
            email: "",
            gender: "",
            birthday: "",
            owner: false,
            address: "",
            more_mobile: [],
            more_email: []

        },
        required: ['department_id', 'account_name', { selectOne: ['mobile', 'email'] }],
        delete: ['address'],
        section: {
            title: __addAccount, //新增住戶帳號
            type: "add",
            button: __createAccount, //建立帳號
            havePic: true,
            content: [{
                title: __accountTitle2, //登入帳號
                field: [{
                    text: __mainTel, //主要電話
                    type: "ShowString",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail, //主要電郵
                    type: "ShowString",
                    key: "email",
                    comment: ""
                }]
            }, {
                title: __accountInfo, //帳戶資訊 (必填)
                field: [{
                        text: __name, //姓名
                        type: "InputField",
                        key: "account_name",
                        comment: ""
                    }, {
                        text: __address, //地址
                        type: "ShowString",
                        key: "address",
                        comment: ""
                    }, {
                        text: __identity, //身份
                        type: "SwitchButton",
                        key: "owner",
                        setting: "holder_name"
                    }

                ]
            }, {
                title: __profile, //個人資訊
                field: [{
                    text: __gender, //性別
                    type: "SwitchButton",
                    key: "gender",
                    comment: ""
                }, {
                    text: __birthday, //生日
                    type: "DatePickerField",
                    key: "birthday",
                    comment: ""
                }]
            }, {
                title: __moreContact, //更多聯絡資訊
                field: [{
                    text: __subTel,
                    type: "InputField",
                    key: "more_mobile",
                    comment: ""
                }, {
                    text: __subEmail,
                    type: "InputField",
                    key: "more_email",
                    comment: ""
                }]
            }]
        }
    },
    haveNoAddress: {
        form: {
            department_id: "",
            account_name: "",
            mobile: "",
            email: "",
            gender: "",
            birthday: "",
            owner: false,
            address: "",
            more_mobile: [],
            more_email: []

        },
        required: ['department_id', 'account_name', { selectOne: ['mobile', 'email'] }],
        delete: ['address', 'departments', 'new_address'],
        section: {
            title: __addAccount, //新增住戶帳號
            type: "add",
            button: __createAccount, //建立帳號
            havePic: true,
            content: [{
                title: __accountTitle2, //登入帳號
                field: [{
                    text: __mainTel, //主要電話
                    type: "ShowString",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail, //主要電郵
                    type: "ShowString",
                    key: "email",
                    comment: ""
                }]
            }, {
                title: __accountInfo, //帳戶資訊 (必填)
                field: [{
                    type: "AddressFrame",
                    key: "departments",
                    setting: {
                        field: [{
                            text: __address, //地址
                            type: "ShowString",
                            key: "address",
                            comment: ""
                        }, {
                            text: __identity,
                            type: "SwitchButton",
                            key: "owner",
                            comment: "此住址戶長為",
                            setting: "holder_name"
                        }]
                    }
                }]
            }, {
                title: __profile, //個人資訊
                field: [{
                    text: __gender, //性別
                    type: "SwitchButton",
                    key: "gender",
                    comment: ""
                }, {
                    text: __birthday, //生日
                    type: "DatePickerField",
                    key: "birthday",
                    comment: ""
                }]
            }, {
                title: __moreContact, //更多聯絡資訊
                field: [{
                    text: __subTel,
                    type: "InputField",
                    key: "more_mobile",
                    comment: ""
                }, {
                    text: __subEmail,
                    type: "InputField",
                    key: "more_email",
                    comment: ""
                }]
            }]
        }
    },
    haveAccount: {
        form: {
            department_id: "",
            account_name: "",
            mobile: "",
            email: "",
            gender: "",
            birthday: "",
            owner: false,
            address: "",
            more_mobile: [],
            more_email: []

        },
        required: ['department_id', 'account_name', { selectOne: ['mobile', 'email'] }],
        delete: ['address', 'departments', 'new_address'],
        section: {
            title: __householderInfo, //新增住戶帳號
            type: "edit",
            button: __createAccount, //建立帳號
            havePic: true,
            content: [{
                title: __accountTitle2, //登入帳號
                field: [{
                    text: __mainTel, //主要電話
                    type: "ShowString",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail, //主要電郵
                    type: "ShowString",
                    key: "email",
                    comment: ""
                }]
            }, {
                title: __accountInfo, //帳戶資訊 (必填),
                field: [{
                        text: __name, //姓名
                        type: "InputField",
                        key: "account_name",
                        comment: ""
                    }, {
                        text: __gender, //性別
                        type: "SwitchButton",
                        key: "gender",
                        comment: ""
                    }, {
                        text: __birthday, //生日
                        type: "DatePickerField",
                        key: "birthday",
                        comment: ""
                    }

                ]
            }, {
                title: __addressInfo, //地址資訊
                field: [{
                    type: "AddressFrame",
                    key: "departments",
                    setting: {
                        field: [{
                            text: __address, //地址
                            type: "ShowString",
                            key: "address",
                            comment: ""
                        }, {
                            text: __identity,
                            type: "SwitchButton",
                            key: "owner",
                            comment: "此住址戶長為",
                            setting: "holder_name"
                        }]
                    }
                }]
            }, {
                title: __moreContact, //更多聯絡資訊
                field: [{
                    text: __subTel,
                    type: "InputField",
                    key: "more_mobile",
                    comment: ""
                }, {
                    text: __subEmail,
                    type: "InputField",
                    key: "more_email",
                    comment: ""
                }]
            }]
        }
    },
    editAccount: {
        form: {
            department_id: "",
            account_name: "",
            mobile: "",
            email: "",
            gender: "",
            birthday: "",
            owner: false,
            address: "",
            more_mobile: [],
            more_email: []
        },
        required: ['account_name', { selectOne: ['mobile', 'email'] }],
        delete: ['address', 'departments', 'new_address'],
        section: {
            title: __householderInfo,
            type: "edit",
            button: __save,
            havePic: true,
            content: [{
                title: __accountTitle2, //登入帳號
                field: [{
                    text: __mainTel, //主要電話
                    type: "ShowString",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail, //主要電郵
                    type: "ShowString",
                    key: "email",
                    comment: ""
                }]
            }, {
                title: __householderInfo, //住戶資訊,
                field: [{
                        text: __name, //姓名
                        type: "InputField",
                        key: "account_name",
                        comment: ""
                    }, {
                        text: __gender, //性別
                        type: "SwitchButton",
                        key: "gender",
                        comment: ""
                    }, {
                        text: __birthday, //生日
                        type: "DatePickerField",
                        key: "birthday",
                        comment: ""
                    }

                ]
            }, {
                title: __addressInfo, //地址資訊
                field: [{
                    type: "AddressFrame",
                    key: "departments",
                    setting: {
                        field: [{
                            text: __address, //地址
                            type: "ShowString",
                            key: "address",
                            comment: ""
                        }, {
                            text: __identity,
                            type: "SwitchButton",
                            key: "owner",
                            comment: "此住址戶長為",
                            setting: "holder_name"
                        }]
                    }
                }]
            }, {
                title: __moreContact, //更多聯絡資訊
                field: [{
                    text: __subTel,
                    type: "InputField",
                    key: "more_mobile",
                    comment: ""
                }, {
                    text: __subEmail,
                    type: "InputField",
                    key: "more_email",
                    comment: ""
                }]
            }]
        }
    },
    addInvite: {
        form: {
            department_id: "",
            account_name: "",
            mobile: "",
            email: "",
            owner: false,
            address: ""
        },
        required: ['department_id', { selectOne: ['mobile', 'email'] }],
        delete: ['address'],
        section: {
            title: __addAccount,
            type: "add",
            button: __sendInvite,
            havePic: false,
            content: [{
                title: __accountTitle,
                field: [{
                    text: __mainTel,
                    type: "InputField",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail,
                    type: "InputField",
                    key: "email",
                    comment: ""
                }]
            }, {
                title: __accountInfo,
                field: [{
                        text: __address,
                        type: "ShowString",
                        key: "address",
                        comment: ""
                    }, {
                        text: __identity,
                        type: "SwitchButton",
                        key: "owner",
                        setting: "holder_name"
                    }

                ]
            }]
        }
    },
    addOnePage: {
        form: {
            community_group_id: "",
            page_name: "",
            mobile: "",
            link: "",
            address: ""
        },
        required: ['community_group_id', 'page_name'],
        delete: ['group'],
        section: {
            title: __pageTitle,
            type: "add",
            button: __createPage,
            havePic: true,
            content: [{
                title: __baseInfo,
                field: [{
                    text: __title,
                    type: "InputField",
                    key: "page_name",
                    comment: ""
                }, {
                    text: __group,
                    type: "SelectDown",
                    key: "community_group_id",
                    comment: "",
                    setting: "group"
                }, {
                    text: __link,
                    type: "InputField",
                    key: "link",
                    comment: ""
                }]
            }, {
                title: __info,
                field: [{
                        text: __telphone,
                        type: "InputField",
                        key: "mobile",
                        comment: ""
                    }, {
                        text: __address,
                        type: "InputField",
                        key: "address",
                        comment: ""
                    }

                ]
            }, {
                title: __comment,
                field: [{
                    text: "",
                    type: "TextPlace",
                    key: "comment",
                    comment: "輸入內容"
                }]
            }]
        }
    },
    editOnePage: {
        form: {
            community_group_id: "",
            page_name: "",
            mobile: "",
            link: "",
            address: ""
        },
        required: ['community_group_id', 'page_name'],
        delete: ['group'],
        section: {
            title: __pageEdit,
            type: "edit",
            button: __createPage,
            havePic: true,
            content: [{
                title: __baseInfo,
                field: [{
                    text: __title,
                    type: "InputField",
                    key: "page_name",
                    comment: ""
                }, {
                    text: __group,
                    type: "SelectDown",
                    key: "community_group_id",
                    comment: "",
                    setting: "group"
                }, {
                    text: __link,
                    type: "InputField",
                    key: "link",
                    comment: ""
                }]
            }, {
                title: __info,
                field: [{
                        text: __telphone,
                        type: "InputField",
                        key: "mobile",
                        comment: ""
                    }, {
                        text: __address,
                        type: "InputField",
                        key: "address",
                        comment: ""
                    }

                ]
            }, {
                title: __comment,
                field: [{
                    text: "",
                    type: "TextPlace",
                    key: "comment",
                    comment: "輸入內容"
                }]
            }]
        }
    },
    addOperator: {
        form: {
            group_id: "",
            account_name: "",
            mobile: "",
            email: "",
            gender: "",
            birthday: ""
        },
        required: ['community_group_id', 'account_name', { selectOne: ['mobile', 'email'] }],
        delete: ['group', 'community_group_id', 'group_id_edit'],
        section: {
            title: __operatorTitle, //新增管理人員帳號
            type: "add",
            button: __createAccount, //建立帳號
            havePic: true,
            content: [{
                title: __accountTitle, //登入帳號 (必填，可擇一)
                field: [{
                    text: __mainTel, //主要電話
                    type: "InputField",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail, //主要電郵
                    type: "InputField",
                    key: "email",
                    comment: ""
                }]
            }, {
                title: __accountInfo, //帳戶資訊 (必填)
                field: [{
                    text: __name, //姓名
                    type: "InputField",
                    key: "account_name",
                    comment: ""
                }, {
                    text: __group,
                    type: "SelectDown",
                    key: "community_group_id",
                    comment: "",
                    setting: "group"
                }]
            }, {
                title: __profile, //個人資訊
                field: [{
                    text: __gender, //性別
                    type: "SwitchButton",
                    key: "gender",
                    comment: ""
                }, {
                    text: __birthday, //生日
                    type: "DatePickerField",
                    key: "birthday",
                    comment: ""
                }]
            }, {
                title: __moreContact, //更多聯絡資訊
                field: [{
                    text: __subTel,
                    type: "InputField",
                    key: "more_mobile",
                    comment: ""
                }, {
                    text: __subEmail,
                    type: "InputField",
                    key: "more_email",
                    comment: ""
                }]
            }]
        }
    },
    editOperator: {
        form: {
            group_id: "",
            account_name: "",
            mobile: "",
            email: "",
            gender: "",
            birthday: ""
        },
        required: ['community_group_id', 'account_name', { selectOne: ['mobile', 'email'] }],
        delete: ['group', 'community_group_id', 'group_id_edit'],
        section: {
            title: __operatorEdit, //編輯管理人員帳號
            type: "edit",
            button: __save, //建立帳號
            havePic: true,
            content: [{
                title: __accountTitle, //登入帳號 (必填，可擇一)
                field: [{
                    text: __mainTel, //主要電話
                    type: "ShowString",
                    key: "mobile",
                    comment: ""
                }, {
                    text: __mainEmail, //主要電郵
                    type: "ShowString",
                    key: "email",
                    comment: ""
                }]
            }, {
                title: __accountInfo, //帳戶資訊 (必填)
                field: [{
                    text: __name, //姓名
                    type: "InputField",
                    key: "account_name",
                    comment: ""
                }]
            }, {
                title: __accuntGroup, //隸屬管理群組
                field: [{
                        text: __group, //群組
                        type: "EditFrame",
                        key: "group_id_edit",
                        comment: "",
                        setting: {
                            text: __group,
                            type: "SelectDown",
                            key_s: "community_group_id",
                            comment: "",
                            setting: "group"
                        }
                    }

                ]
            }, {
                title: __profile, //個人資訊
                field: [{
                    text: __gender, //性別
                    type: "SwitchButton",
                    key: "gender",
                    comment: ""
                }, {
                    text: __birthday, //生日
                    type: "DatePickerField",
                    key: "birthday",
                    comment: ""
                }]
            }, {
                title: __moreContact, //更多聯絡資訊
                field: [{
                    text: __subTel,
                    type: "InputField",
                    key: "more_mobile",
                    comment: ""
                }, {
                    text: __subEmail,
                    type: "InputField",
                    key: "more_email",
                    comment: ""
                }]
            }]
        }
    },
    createBill: {
        form: {
            billName: "",
            billType: "",
            billTime: ""
        },
        required: ['billName', 'billType', 'billTime'],
        delete: [],
        section: {
            title: __newBill, //新增帳單
            type: "add",
            button: __createBill, //建立帳單
            havePic: false,
            content: [{
                title: __billSetting, //帳單設定
                field: [{
                    text: __billName, //帳單名稱
                    type: "InputField",
                    key: "billing"
                }, {
                    text: __billType, //帳單類型
                    type: "SwitchButton",
                    key: "billType"
                }, {
                    text: __paymentLimit, //繳費期限
                    type: "InputUnit",
                    key: "paylimit",
                    comment: __day //天
                }]
            }]
        }
    },
    communityBillSetting: {
        form: {
            plan: "",
            plan_unit: "",
            plan_amount: "",
            paylimit: "",
            billing: ""
        },
        required: [],
        delete: [],
        section: {
            title: __paymentSetting, //社區管理費帳單設定
            type: "add",
            button: __savePayment, //儲存帳單設定
            havePic: false,
            content: [{
                title: __billing, //計費方式
                field: [{
                    text: "",
                    type: "SwitchButtonInput",
                    key: "billing"
                }]
            }, {
                title: __billSetting, //帳單設定
                field: [{
                    text: __paymentLimit, //繳費期限
                    type: "InputUnit",
                    key: "paylimit",
                    comment: __day //天
                }]
            }]
        }
    },
    addCyclePlan: {
        form: {
            name: "",
            plan_unit: "",
            paylimit: "",
            discountExplan: "",
            planDiscount: ""
        },
        required: [],
        delete: [],
        section: {
            title: __addCyclePlan, //新增週期方案
            type: "add",
            button: __savePlan, //儲存方案
            havePic: false,
            content: [{
                title: __planContent, //方案內容
                field: [{
                    text: __planName, //方案名稱
                    type: "InputField",
                    key: "name",
                    comment: ""
                }, {
                    text: __payCycle, //收費週期
                    type: "InputUnit",
                    key: "plan_unit",
                    comment: __payCycleUnit //個月自動發送帳單
                }, {
                    text: __planDiscount, //方案折扣
                    type: "ShowString",
                    key: "discount",
                    comment: ""
                }, {
                    text: "",
                    type: "SwitchButtonInput",
                    key: "planDiscount",
                    setting: "haveplace"
                }, {
                    text: __discountExplan, //折扣說明
                    type: "InputField",
                    key: "discountExplan",
                    comment: ""
                }]
            }]
        }
    },
    SwitchSetting: { // for Switch
        owner: {
            value: ["true", "false"],
            text: [__homeLeader, __homeMember],
            comment: "此住址戶長為"
        },
        gender: {
            value: ["M", "F"],
            text: [__male, __female]
        },
        announceType: {
            value: ["fix", "record", "activity"],
            text: [__fix, __record, __activity]
        },
        infoType: {
            value: ["false", "true"],
            text: [__close, __open]
        },
        billType: {
            value: ["manually", "auto"],
            text: [__onceManually, __cycleAuto]
        }
    },
    SwitchInputSetting: {
        billing: {
            keys: ["plan_amount", "plan_unit"],
            text: [__amount, __unitPrice],
            comment: [__amountUnit, __unitPriceUnit]
        },
        planDiscount: {
            keys: ["discount_all", "discount_some"],
            text: [__allAmount, __amountDiscount],
            comment: ["%", __amountUnit]
        }
    }
};
