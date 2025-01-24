const verificationEmailTemplate = ({ name, url }) => {
  return `
  <p>Dear ${name}</p>
    <p>Thank You for registering with ESHOP</p>
    <a
    href="${url}"
    style="background-color: #007bff; 
           color: white; 
           border: none; 
           padding: 10px 20px; 
           font-size: 16px; 
           font-weight: bold; 
           border-radius: 5px; 
           cursor: pointer; 
           transition: background-color 0.3s ease;
           display: inline-block; 
           text-align: center;">
    Verify Email
</a>
    `;
};

export default verificationEmailTemplate;
