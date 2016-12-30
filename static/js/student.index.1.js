$(function() {
	// init date tables
	var jobTable = $("#job_list").dataTable({
		"deferRender": true,
		"processing" : true, 
	    "serverSide": true,
		"ajax": {
			url: base_url + "/germany/student/pageList",
			scriptCharset: 'utf-8',
	        data : function ( d ) {
                d.name = $('#name').val();
                d.city = $('#city').val();
            }
	    },
	    "searching": false,
	    "ordering": false,
	    //"scrollX": true,	// X轴滚动条，取消自适应
	    "columns": [
	                { "data": 'studentId', "bSortable": false, "visible" : true},
	                { "data": 'name'},
	                { "data": 'email', "visible" : true},
	                { "data": 'phone'},
	                { "data": 'address'},
	                { "data": 'city', "visible" : true},
	                { "data": 'createTime', "visible" : false},
	                { "data": 'createUser', "visible" : false},
	                { "data": 'modifyTime', "visible" : false},
	                { "data": 'modifyUser', "visible" : false},
	                { "data": '操作' ,
	                	"render": function ( data, type, row ) {
	                		return function(){
	                			// job data
	                			var jobDataMap = eval('(' + row.jobData + ')');
	                			
	                			var html = '<p studentId="'+ row.studentId +'" '+
	                						' name="'+ row.name +'" '+
	                						' email="'+ row.email +'" '+
	                						' phone="'+ row.phone +'" '+
	                						' address="'+ row.address +'" '+
	                						' city="'+ row.city +'" '+
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
			url = base_url + "/germany/student/remove";
		} else if ("job_trigger" == type) {
			typeName = "执行";
			url = base_url + "/jobinfo/trigger";
		} else {
			return;
		}
		
		var studentId = $(this).parent('p').attr("studentId");
		
		ComConfirm.show("确认" + typeName + "?", function(){
			$.ajax({
				type : 'POST',
				url : url,
				data : {
					"studentId" : studentId
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
        	name : {  
        		required : true ,
                maxlength: 100,
            },  
            email : {  
            	required : false ,
                maxlength: 100
            },  
            phone : {  
            	required : false ,
                maxlength: 200
            },
            city : {  
            	required : false ,
                maxlength: 200
            },
            address : {
            	required : false ,
                maxlength: 200
            }
        }, 
        messages : {  
        	name : {  
        		required :"请选择“学生姓名”"  ,
                maxlength:"“学生姓名”长度不应超过100位"
            },  
            email : {
            	required :"请输入“邮箱”."  ,
                maxlength:"“邮箱”长度不应超过100位"
            },  
            phone : {
            	required :"请输入“电话”."  ,
                maxlength:"“电话”长度不应超过200位"
            },  
            city : {
            	required :"请输入“城市”."  ,
                maxlength:"“城市”长度不应超过200位"
            },  
            address : {
            	required :"请输入“地址”."  ,
                maxlength:"“地址”长度不应超过200位"
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
        	$.post(base_url + "/germany/student/add",  $("#addModal .form").serialize(), function(data, status) {
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
	
	// 更新
	$("#job_list").on('click', '.update',function() {
		$("#updateModal .form input[name='studentId']").val($(this).parent('p').attr("studentId"));
		$("#updateModal .form input[name='name']").val($(this).parent('p').attr("name"));
		$("#updateModal .form input[name='email']").val($(this).parent('p').attr("email"));
		$("#updateModal .form input[name='phone']").val($(this).parent('p').attr("phone"));
		$("#updateModal .form input[name='address']").val($(this).parent('p').attr("address"));
		$("#updateModal .form input[name='city']").val($(this).parent('p').attr("city"));
		
		$('#updateModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var updateModalValidate = $("#updateModal .form").validate({
		errorElement : 'span',  
        errorClass : 'help-block',
        focusInvalid : true,  
        rules : {  
        	studentId : {  
            	required : true 
            }
        }, 
        messages : {  
        	studentId : {
            	required :"请填写“学生ID”."  ,
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
    		$.post(base_url + "/germany/student/update", $("#updateModal .form").serialize(), function(data, status) {
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
