import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define a professional sender email address
// Note: When testing, Resend allows sending FROM 'onboarding@resend.dev' to your verified email.
// Once you add a custom domain to Resend, change this to 'support@yourdomain.com'
const SENDER_EMAIL = 'onboarding@resend.dev'; 



export const sendPasswordResetEmail = async (email, resetUrl) => {
    try {
        const { data, error } = await resend.emails.send({
            from: `JobPortal Security <${SENDER_EMAIL}>`,
            to: [email],
            subject: 'Reset Your JobPortal Password',
            html: `
                <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                    <h2 style="color: #F83002; text-align: center;">Password Reset Request</h2>
                    <p style="color: #333; font-size: 16px;">We received a request to reset the password associated with your account.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #F83002; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Reset Password</a>
                    </div>
                    
                    <p style="color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
                    <p style="color: #6A38C2; font-size: 12px; word-break: break-all;">${resetUrl}</p>
                    
                    <p style="color: #64748b; font-size: 14px; margin-top: 20px;">This link will expire in exactly <strong>1 hour</strong>.</p>
                    <p style="color: #64748b; font-size: 14px;">If you did not request this, please safely ignore this email and your password will remain unchanged.</p>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                    <p style="color: #94a3b8; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} JobPortal Inc. All rights reserved.</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend API Error (Password Reset):", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Failed to send password reset email:", err);
        return { success: false, error: err.message };
    }
};

export const sendStatusUpdateEmail = async (email, jobTitle, newStatus) => {
    try {
        let statusColor = "#333";
        let statusMessage = "Your application status has been updated.";
        
        if (newStatus.toLowerCase() === 'accepted') {
            statusColor = "#16a34a"; // Green
            statusMessage = `Congratulations! Your application for <strong>${jobTitle}</strong> has been <strong>Accepted</strong>.`;
        } else if (newStatus.toLowerCase() === 'rejected') {
            statusColor = "#dc2626"; // Red
            statusMessage = `We regret to inform you that your application for <strong>${jobTitle}</strong> has been <strong>Rejected</strong>.`;
        }

        const { data, error } = await resend.emails.send({
            from: `JobPortal Updates <${SENDER_EMAIL}>`,
            to: [email],
            subject: `Application Update: ${jobTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                    <h2 style="color: #6A38C2; text-align: center;">Application Status Update</h2>
                    
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0; border-left: 4px solid ${statusColor};">
                        <p style="color: #333; font-size: 16px; margin: 0;">${statusMessage}</p>
                    </div>
                    
                    <p style="color: #64748b; font-size: 14px;">Log in to your JobPortal dashboard to view more details and continue your job search.</p>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                    <p style="color: #94a3b8; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} JobPortal Inc. All rights reserved.</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend API Error (Status Update):", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Failed to send status update email:", err);
        return { success: false, error: err.message };
    }
};

export const sendApplicationConfirmationEmail = async (email, fullname, jobTitle) => {
    try {
        const { data, error } = await resend.emails.send({
            from: `JobPortal Applications <${SENDER_EMAIL}>`,
            to: [email],
            subject: `Application Submitted: ${jobTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                    <h2 style="color: #6A38C2; text-align: center;">Application Successful!</h2>
                    
                    <p style="color: #333; font-size: 16px;">Hello <strong>${fullname}</strong>,</p>
                    <p style="color: #333; font-size: 16px;">You have successfully applied for the position of <strong>${jobTitle}</strong>.</p>
                    
                    <p style="color: #64748b; font-size: 14px;">The recruiter will review your application soon. Keep an eye on your inbox for further updates.</p>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                    <p style="color: #94a3b8; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} JobPortal Inc. All rights reserved.</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend API Error (Application Confirmation):", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Failed to send application confirmation email:", err);
        return { success: false, error: err.message };
    }
};
