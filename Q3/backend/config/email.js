const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmployeeCredentials = async (employee, password) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employee.email,
      subject: 'Your ERP System Credentials',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Welcome to ERP System</h2>
            <p>Dear <strong>${employee.name}</strong>,</p>
            <p>Your employee account has been created successfully. Here are your login credentials:</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Employee ID:</strong> ${employee.empId}</p>
              <p style="margin: 10px 0;"><strong>Password:</strong> ${password}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${employee.email}</p>
            </div>
            
            <p style="color: #666;">Please login to the employee portal and change your password after first login.</p>
            <p style="color: #666;"><strong>Department:</strong> ${employee.department}</p>
            <p style="color: #666;"><strong>Position:</strong> ${employee.position}</p>
            <p style="color: #666;"><strong>Monthly Salary:</strong> ₹${employee.salary?.toFixed(2)}</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>If you have any questions, please contact your administrator.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${employee.email}`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error.message);
    return { success: false, message: 'Failed to send email: ' + error.message };
  }
};

module.exports = { sendEmployeeCredentials };
