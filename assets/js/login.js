$(function () {
    //* 点击去注册账号让 登录框隐藏，注册框显示
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $(".reg-box").show();
    })

    //* 点击去登录让 注册框隐藏，登录框显示
    $('#link_login').click(() => {
        $('.login-box').show();
        $(".reg-box").hide();
    })
})

// 从 LayUI 中获取 form 对象
const form = layui.form;
// 通过 form.verify() 方法自定义校验规则
form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: (val) => {
        const pwd = $(".reg-box [name=repassword]").val();
        if (val !== pwd) return "两次密码不一致"
    }
})

// 获取 layui 弹窗
const layer = layui.layer;
// 设置请求根路径

// todo 监听注册表单，发送注册请求
$('#form_reg').on('submit', function (e) {
    // 阻止表单默认提交事件
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/api/reguser",
        data: {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val(),
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('注册失败')
            }
            layer.msg('注册成功')
            // 注册成功后跳转到登录界面
            $('#link_login').click()
        }
    })
})
//todo 监听登录表单，发送登录请求
$('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/api/login",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg("登录成功！");
            localStorage.setItem("token", res.token);
            location.href = '/index.html';

        }
    })
})