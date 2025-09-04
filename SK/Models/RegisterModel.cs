using System.ComponentModel.DataAnnotations;

public class RegisterModel
{
    [Required(ErrorMessage = "账号不能为空")]
    [Display(Name = "账号")]
    public string Account { get; set; }

    [Required(ErrorMessage = "密码不能为空")]
    [DataType(DataType.Password)]
    [Display(Name = "密码")]
    public string Password { get; set; }

    [Required(ErrorMessage = "确认密码不能为空")]
    [DataType(DataType.Password)]
    [Display(Name = "确认密码")]
    [Compare("Password", ErrorMessage = "密码和确认密码不匹配")]
    public string ConfirmPassword { get; set; }
}