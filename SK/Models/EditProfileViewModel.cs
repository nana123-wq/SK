using System.ComponentModel.DataAnnotations;

namespace SK.Models
{
    public class EditProfileViewModel
    {
        [Display(Name = "昵称")]
        public string Nickname { get; set; }

        [Display(Name = "个性签名")]
        [StringLength(30, ErrorMessage = "个性签名不能超过30个字符")]
        public string Signature { get; set; }
    }
}