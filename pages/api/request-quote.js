
const sgMail = require('@sendgrid/mail')

export default async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const values = req.body;

    const content = {
        to: 'contact@archiset.ch',
        from: 'noreply@archiset.ch',
        subject: 'Nouvelle demande de devis',
        text: `
            ${values.firstName} ${values.lastName} a fait une demande
            Email de contact:${values.email}
            Budget: ${values.budget}
            Description du projet: ${values.projectDescription}
        `,
        html: `
            <h3>${values.firstName} ${values.lastName} a fait une demande</h3>
            <div><strong>Email de contact:</strong> ${values.email}</div>
            <div><strong>Téléphone de contact:</strong> ${values.phone === null ? 'non renseigné' : values.phone}</div>
            <div><strong>Budget:</strong> ${values.budget === null ? 'non renseigné' : 'CHF ' + values.budget}</div>
            <div><strong>Description du projet:</strong><br>${values.projectDescription}</div>
        `
    }

    try {
        await sgMail.send(content);
        res.status(200).send('Message sent successfully.');
    } catch (error) {
        console.log('ERROR', error);
        res.status(400).send('Message not sent.');
    }
}