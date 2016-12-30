$(function() {
	// init date tables
	var jobTable = $("#job_list").dataTable({
		"deferRender": true,
		"processing" : true, 
	    "serverSide": true,
		"ajax": {
			url: base_url + "/germany/course/pageList",
			scriptCharset: 'utf-8',
	        data : function ( d ) {
                d.courseName = $('#courseName').val();
                d.studentName = $('#studentName').val();
            }
	    },
	    "searching": false,
	    "ordering": false,
	    //"scrollX": true,	// X轴滚动条，取消自适应
	    "columns": [
	                { "data": 'courseId', "bSortable": false, "visible" : true},
	                { "data": 'courseName'},
	                { "data": 'studentName'},
	                { "data": 'signUp'},
	                { "data": 'signIn',"visible" : false},
	                { "data": 'signInData',"visible" : true},
	                { "data": 'createTime', "visible" : false},
	                { "data": 'createUser', "visible" : false},
	                { "data": 'modifyTime', "visible" : false},
	                { "data": 'modifyUser', "visible" : false},
	                { "data": '操作' ,
	                	"render": function ( data, type, row ) {
	                		return function(){
	                			// job data
	                			var jobDataMap = eval('(' + row.jobData + ')');
	                			
	                			var html = '<p courseId="'+ row.courseId +'" '+
	                						' courseName="'+ row.courseName +'" '+
	                						' studentName="'+ row.studentName +'" '+
	                						' signUp="'+ row.signUp +'" '+
	                						' signIn="'+ row.signIn +'" '+
	                						' signInData="'+ row.signInData +'" '+
	                						' createTime="'+ row.createTime +'" '+
	                						' createUser="'+ row.createUser +'" '+
	                						' modifyTime="'+ row.modifyTime +'" '+
	                						' modifyUser="'+ row.modifyUser +'" '+
	                						'>'+
	                						'<button class="btn btn-warning btn-xs update" type="button">编辑</button>  ' +
	                						'<button class="btn btn-danger btn-xs job_operate" type="job_del" type="button">删除</button> ' +
	                						'<button class="btn btn-danger btn-xs job_operate" type="job_info" type="button">详情</button> ' +
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
			url = base_url + "/germany/course/remove";
		} else if ("job_info" == type) {
			typeName = "详情:";
			var signInData = $(this).parent('p').attr("signIn");
			ComAlert.show(1, signInData.substring(0,50) + "\r\n" + signInData.substring(50));
			return;
		} else {
			return;
		}
		
		var courseId = $(this).parent('p').attr("courseId");
		
		ComConfirm.show("确认" + typeName + "?", function(){
			$.ajax({
				type : 'POST',
				url : url,
				data : {
					"courseId" : courseId
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
        	courseName : {  
        		required : true ,
                maxlength: 100,
            }
        }, 
        messages : {  
        	courseName : {  
        		required :"请选择“课程”"  ,
                maxlength:"“课程”长度不应超过100位"
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
        	$.post(base_url + "/germany/course/add",  $("#addModal .form").serialize(), function(data, status) {
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
		$("#updateModal .form input[name='courseId']").val($(this).parent('p').attr("courseId"));
		$("#updateModal .form input[name='courseName']").val($(this).parent('p').attr("courseName"));
		$("#updateModal .form input[name='studentName']").val($(this).parent('p').attr("studentName"));
		$("#updateModal .form input[name='signUp']").val($(this).parent('p').attr("signUp"));
		$("#updateModal .form input[name='signIn']").val($(this).parent('p').attr("signIn"));
		
		$('#updateModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var updateModalValidate = $("#updateModal .form").validate({
		errorElement : 'span',  
        errorClass : 'help-block',
        focusInvalid : true,  
        rules : {  
        	courseId : {  
            	required : true 
            }
        }, 
        messages : {  
        	courseId : {
            	required :"请填写“课程ID”."  ,
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
    		$.post(base_url + "/germany/course/update", $("#updateModal .form").serialize(), function(data, status) {
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
	
});
