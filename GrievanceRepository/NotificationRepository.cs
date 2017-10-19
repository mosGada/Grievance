namespace GrievanceRepository
{
    #region Usings
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using SendGrid;
    using SendGrid.Helpers.Mail;
    using Grievance.DAL;
    #endregion

    public class NotificationRepository
    {
        static string apiKey = @"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";
        public async Task<Response> SendNotification(string emailAddress)
        {
            var ticket = new TicketDTO()
            {
                CreatedDate = DateTime.Now,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ex sem, et mollis ante pretium varius. In non justo eu ipsum finibus rutrum at in libero. Etiam pretium augue vel luctus malesuada. Donec tempus congue nisi eu lobortis. Morbi auctor, velit vel elementum hendrerit, ligula nulla congue nisl, sed blandit nibh magna eu nunc. Duis ultricies mi sed turpis hendrerit aliquam. Proin egestas orci rhoncus commodo eleifend. Cras sed massa ac urna sollicitudin varius a ut nunc. Praesent vestibulum, metus et viverra lobortis, elit nunc rutrum erat, ut consectetur sapien dui vel ipsum. Nulla sodales leo quis venenatis congue. Pellentesque urna leo, pulvinar in arcu a, egestas sollicitudin ipsum. Duis sodales vel metus eget dapibus. Aliquam ultrices finibus nulla ut aliquam. Nam laoreet eros ac ullamcorper bibendum. Proin sed mollis orci, ut pretium est. Nullam vel faucibus neque. Pellentesque auctor velit lectus, at dictum urna iaculis at. Aliquam vehicula commodo velit ac posuere. Praesent porttitor nisl arcu, tempor gravida leo fermentum et. Morbi auctor urna sit amet interdum rhoncus. Proin ac augue porttitor, laoreet risus et, sollicitudin elit. Maecenas semper risus in iaculis efficitur. Nunc ultricies vestibulum turpis in mollis. Aenean ultricies mi quam, at ultricies tellus venenatis non. Suspendisse nec velit ac est dictum volutpat non luctus orci. Cras non odio eu velit imperdiet fermentum. Cras elementum erat at lectus cursus, id rutrum lorem eleifend. Quisque nec nulla sed lectus dapibus efficitur. Ut euismod vestibulum nibh vitae feugiat. Suspendisse potenti.",
                Name = "Typical Ticket"
            };

            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage();
            msg.SetFrom(new EmailAddress("info@grievance.com", "Grievance Team"));

            var recipients = new List<EmailAddress>
            {
                new EmailAddress("mosgada@gmail.com", "Mosa Qhalane")
            };

            msg.AddTos(recipients);
            msg.SetSubject("Grievance: Email Notification");

            var emailBody = Resources.ConfirmationEmail.ToString().Replace("@Name", ticket.Name).Replace("@TicketDescription", ticket.Description).Replace("@TimeLogged", ticket.CreatedDate.ToString());

            msg.AddContent(MimeType.Html, emailBody);

            return await client.SendEmailAsync(msg);
        }

        public async void SendConfirmationNotification(string emailAddress, TicketDTO ticket)
        {
            await Task.Run(async () =>
            {
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage();

                msg.SetFrom(new EmailAddress("info@grievance.com", "Grievance Team"));
                var recipients = new List<EmailAddress>
            {
                new EmailAddress(emailAddress, ticket.CreatedBy)
            };

                msg.AddTos(recipients);
                msg.SetSubject(string.Format("Grievance System - Reference Number: {0}", ticket.ReferenceNumber));

                var emailBody = Resources.ConfirmationEmail.ToString().Replace("@Name", ticket.Name).Replace("@TicketDescription", ticket.Description).Replace("@TimeLogged", ticket.CreatedDate.ToString("f")).Replace("@Complainant", ticket.CreatedBy);

                msg.AddContent(MimeType.Html, emailBody);

                var response = await client.SendEmailAsync(msg);
            });
        }
    }
}
