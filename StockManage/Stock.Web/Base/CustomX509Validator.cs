using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.IdentityModel.Selectors;
 
namespace EDI.Web.Base
{
    /// <summary>
    /// 创建人：Paul
    /// 创建日期：2011-08-08 19:29:52
    /// 修改人：【Paul】
    /// 修改日期：【2011-08-08 19:29:52】
    /// 修改内容：【新增】
    /// CustomX509Validator说明：由于系统采用自己生成的证书，因此此处需要重写一个获取x509证书的验证类。
    /// 如果换成购买的商业证书，此类就不需要了。
    /// </summary> 
    public class CustomX509Validator : X509CertificateValidator
    {
        public override void Validate(System.Security.Cryptography.X509Certificates.X509Certificate2 certificate)
        {
            if (certificate == null)
                throw new ArgumentNullException("X509认证证书为空！");

            // check if the name of the certifcate matches
            if (certificate.SubjectName.Name != ConfigurationManager.AppSettings["EDICert"])
                throw new SecurityTokenValidationException("Certificated was not issued by thrusted issuer");
        }
    }
}
