$(function() {
	// init date tables
	var jobTable = $("#job_list").dataTable({
		"deferRender": true,
		"processing" : true, 
	    "serverSide": true,
		"ajax": {
			url: base_url + "/userInfo/pageList",
			scriptCharset: 'utf-8',
	        data : function ( d ) {
                d.userName = $('#userName').val();
                d.userType = $('#userType').val();
            }
	    },
	    "searching": false,
	    "ordering": false,
	    //"scrollX": true,	// X轴滚动条，取消自适应
	    "columns": [
	                { "data": 'userId', "bSortable": false, "visible" : false},
	                { "data": 'userName'},
	                { "data": 'password', "visible" : false},
	                { "data": 'userType',
	                  "render": function ( data, type, row ) {
	            			var groupMenu = $("#userType").find("option");
	            			for ( var index in $("#userType").find("option")) {
	            				if ($(groupMenu[index]).attr('value') == data) {
									return $(groupMenu[index]).html();
								}
							}
	            			return data;
	            		}
	                },
	                { "data": 'locked',
	                  "render": function ( data, type, row ) {
	            			var groupMenu = $("#locked").find("option");
	            			for ( var index in $("#locked").find("option")) {
	            				if ($(groupMenu[index]).attr('value') == data) {
	            					return $(groupMenu[index]).html();
								}
							}
	            			return data;
	            		}
	                },
	                { "data": 'credit', "visible" : true},
	                { "data": 'createTime', "visible" : true},
	                { "data": 'createUser', "visible" : true},
	                { "data": 'modifyTime', "visible" : true},
	                { "data": 'modifyUser', "visible" : true},
	                { "data": '操作' ,
	                	"render": function ( data, type, row ) {
	                		return function(){
	                			// job data
	                			var jobDataMap = eval('(' + row.jobData + ')');
	                			
	                			var html = '<p userId="'+ row.userId +'" '+
	                						' userName="'+ row.userName +'" '+
	                						' password="'+ row.password +'" '+
	                						' userType="'+ row.userType +'" '+
	                						' locked="'+ row.locked +'" '+
	                						' credit="'+ row.credit +'" '+
	                						' createTime="'+ row.createTime +'" '+
	                						' createUser="'+ row.createUser +'" '+
	                						' modifyTime="'+ row.modifyTime +'" '+
	                						' modifyUser="'+ row.modifyUser +'" '+
	                						'>'+
	                						'<button class="btn btn-warning btn-xs update" type="button">编辑</button>  ' +
	                						'<button class="btn btn-danger btn-xs job_operate" type="job_del" type="button">删除</button> ' + 
									'</p>';
	                			
	                			return html;
	                		};
	                	}
	                }
	            ],
		"language" : {
			"sProcessing" : "处理中...",
			"sLengthMenu" : "每页 _MENU_ 条记录",
			"sZeroRecords" : "没有匹配结果",
			"sInfo" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
			"sInfoEmpty" : "无记录",
			"sInfoFiltered" : "(共 _MAX_ 条记录)",
			"sInfoPostFix" : "",
			"sSearch" : "搜索:",
			"sUrl" : "",
			"sEmptyTable" : "表中数据为空",
			"sLoadingRecords" : "载入中...",
			"sInfoThousands" : ",",
			"oPaginate" : {
				"sFirst" : "首页",
				"sPrevious" : "上页",
				"sNext" : "下页",
				"sLast" : "末页"
			},
			"oAria" : {
				"sSortAscending" : ": 以升序排列此列",
				"sSortDescending" : ": 以降序排列此列"
			}
		}
	});
	
	// 搜索按钮
	$('#searchBtn').on('click', function(){
		jobTable.fnDraw();
	});
	
	// job operate
	$("#job_list").on('click', '.job_operate',function() {
		var typeName;
		var url;
		var type = $(this).attr("type");
		if ("job_pause" == type) {
			typeName = "暂停";
			url = base_url + "/jobinfo/pause";
		} else if ("job_resume" == type) {
			typeName = "恢复";
			url = base_url + "/jobinfo/resume";
		} else if ("job_del" == type) {
			typeName = "删除";
			url = base_url + "/userInfo/remove";
		} else if ("job_trigger" == type) {
			typeName = "执行";
			url = base_url + "/jobinfo/trigger";
		} else {
			return;
		}
		
		var userId = $(this).parent('p').attr("userId");
		
		ComConfirm.show("确认" + typeName + "?", function(){
			$.ajax({
				type : 'POST',
				url : url,
				data : {
					"userId" : userId
				},
				dataType : "json",
				success : function(data){
					if (data.code == 200) {
						ComAlert.show(1, typeName + "成功", function(){
							//window.location.reload();
							jobTable.fnDraw();
						});
					} else {
						ComAlert.show(1, typeName + "失败");
					}
				},
			});
		});
	});
	
	// jquery.validate 自定义校验 “英文字母开头，只含有英文字母、数字和下划线”
	jQuery.validator.addMethod("myValid01", function(value, element) {
		var length = value.length;
		var valid = /^[a-zA-Z][a-zA-Z0-9_]*$/;
		return this.optional(element) || valid.test(value);
	}, "只支持英文字母开头，只含有英文字母、数字和下划线");
	
	// 新增
	$(".add").click(function(){
		$('#addModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var addModalValidate = $("#addModal .form").validate({
		errorElement : 'span',  
        errorClass : 'help-block',
        focusInvalid : true,  
        rules : {  
        	userType : {  
        		required : true ,
                maxlength: 100,
            },  
            userName : {  
            	required : true ,
                maxlength: 100
            },  
            password : {  
            	required : true ,
                maxlength: 200
            },
            userStatus : {
            	required : true ,
                maxlength: 200
            }
        }, 
        messages : {  
        	userType : {  
        		required :"请选择“用户类型”"  ,
                maxlength:"“用户类型”长度不应超过100位"
            },  
            userName : {
            	required :"请输入“用户名”."  ,
                maxlength:"“用户名”长度不应超过100位"
            },  
            password : {
            	required :"请输入“密码”."  ,
                maxlength:"“密码”长度不应超过200位"
            },  
            userStatus : {
            	required :"请输入“状态”."  ,
                maxlength:"“状态”长度不应超过200位"
            }
        }, 
		highlight : function(element) {  
            $(element).closest('.form-group').addClass('has-error');  
        },
        success : function(label) {  
            label.closest('.form-group').removeClass('has-error');  
            label.remove();  
        },
        errorPlacement : function(error, element) {  
            element.parent('div').append(error);  
        },
        submitHandler : function(form) {
        	$.post(base_url + "/userInfo/add",  $("#addModal .form").serialize(), function(data, status) {
    			if (data.code == "200") {
    				ComAlert.show(1, "新增任务成功", function(){
    					window.location.reload();
    				});
    			} else {
    				if (data.msg) {
    					ComAlert.show(2, data.msg);
    				} else {
    					ComAlert.show(2, "新增失败");
    				}
    			}
    		});
		}
	});
	$("#addModal").on('hide.bs.modal', function () {
		$("#addModal .form")[0].reset();
		addModalValidate.resetForm();
		$("#addModal .form .form-group").removeClass("has-error");
		$(".remote_panel").show();	// remote
	});
	
	// GLUE模式开启
	$("#addModal .form .ifGLUE").click(function(){
		var ifGLUE = $(this).is(':checked');
		var $handler_name = $("#addModal .form input[name='handler_name']");
		var $glueSwitch = $("#addModal .form input[name='glueSwitch']");
		if (ifGLUE) {
			$handler_name.val("");
			$handler_name.attr("readonly","readonly");
			$glueSwitch.val(1);
		} else {
			$handler_name.removeAttr("readonly");
			$glueSwitch.val(0);
		}
	});
	$("#updateModal .form .ifGLUE").click(function(){
		var ifGLUE = $(this).is(':checked');
		var $handler_name = $("#updateModal .form input[name='handler_name']");
		var $glueSwitch = $("#updateModal .form input[name='glueSwitch']");
		if (ifGLUE) {
			$handler_name.val("");
			$handler_name.attr("readonly","readonly");
			$glueSwitch.val(1);
		} else {
			$handler_name.removeAttr("readonly");
			$glueSwitch.val(0);
		}
	});
	
	// 更新
	$("#job_list").on('click', '.update',function() {
		$("#updateModal .form input[name='userId']").val($(this).parent('p').attr("userId"));
		$("#updateModal .form input[name='userName']").val($(this).parent('p').attr("userName"));
		$("#updateModal .form input[name='password']").val($(this).parent('p').attr("password"));
		$("#updateModal .form input[name='userType']").val($(this).parent('p').attr("userType"));
		$("#updateModal .form input[name='locked']").val($(this).parent('p').attr("locked"));
		
		$('#updateModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var updateModalValidate = $("#updateModal .form").validate({
		errorElement : 'span',  
        errorClass : 'help-block',
        focusInvalid : true,  
        rules : {  
        	userId : {  
            	required : true 
            }, 
            userType : {  
            	required : true ,
                maxlength: 3
            },  
            password : {  
            	required : true ,
                maxlength: 20
            },
            userName : {
            	required : true ,
                maxlength: 20
            },
            userStatus : {
            	required : true ,
                maxlength: 5
            }
        }, 
        messages : {  
        	userId : {
            	required :"请选择“用户ID”."  ,
            },  
            userType : {
            	required :"请选择“用户类型”."  ,
                maxlength:"“用户类型”长度不应超过3位"
            },  
            userName : {
            	required :"请输入“用户名”."  ,
                maxlength:"“用户名”长度不应超过20位"
            },  
            password : {
            	required :"请输入“密码”."  ,
                maxlength:"“密码”长度不应超过20位"
            },
            userStatus : {
            	required : "请选择“用户状态”."  ,
                maxlength: "“用户状态”长度不应超过5位"
            }
        }, 
		highlight : function(element) {  
            $(element).closest('.form-group').addClass('has-error');  
        },
        success : function(label) {  
            label.closest('.form-group').removeClass('has-error');  
            label.remove();  
        },
        errorPlacement : function(error, element) {  
            element.parent('div').append(error);  
        },
        submitHandler : function(form) {
    		$.post(base_url + "/userInfo/update", $("#updateModal .form").serialize(), function(data, status) {
    			if (data.code == "200") {
    				ComAlert.show(1, "更新成功", function(){
    					window.location.reload();
    				});
    			} else {
    				if (data.msg) {
    					ComAlert.show(2, data.msg);
					} else {
						ComAlert.show(2, "更新失败");
					}
    			}
    		});
		}
	});
	$("#updateModal").on('hide.bs.modal', function () {
		$("#updateModal .form")[0].reset()
	});
	
	
	/*
	// 新增-添加参数
	$("#addModal .addParam").on('click', function () {
		var html = '<div class="form-group newParam">'+
				'<label for="lastname" class="col-sm-2 control-label">参数&nbsp;<button class="btn btn-danger btn-xs removeParam" type="button">移除</button></label>'+
				'<div class="col-sm-4"><input type="text" class="form-control" name="key" placeholder="请输入参数key[将会强转为String]" maxlength="200" /></div>'+
				'<div class="col-sm-6"><input type="text" class="form-control" name="value" placeholder="请输入参数value[将会强转为String]" maxlength="200" /></div>'+
			'</div>';
		$(this).parents('.form-group').parent().append(html);
		
		$("#addModal .removeParam").on('click', function () {
			$(this).parents('.form-group').remove();
		});
	});
	*/
});
