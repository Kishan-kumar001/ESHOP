const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <div>
  <p>Dear, ${name}</p>
  <p>You're requested a password reset. Please use the following OTP code to reset your password.</p>
  <p style="background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">${otp}</p>
  <p>This OTP is valid for 1hour only. Enter this OTP in the ESHOP website to proceed with resetting your password </p>
  <br/>
  </br>
  <p>Thanks</p>
  <p>ESHOP</p>
  </div>
  `;
};

export default forgotPasswordTemplate;
