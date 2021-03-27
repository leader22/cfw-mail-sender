export const parseFormData = async request => {
  const formData = await request.formData();

  const params = {
    to: formData.get("to"),
    cc: formData.get("cc"),
    subject: formData.get("subject") || "No subject",
    content: formData.get("content") || "No content"
  };

  return params;
};

export const sendMail = async params => {
  if (!params.to) return;

  const body = {
    personalizations: [
      {
        to: [{ email: params.to }],
        subject: params.subject
      }
    ],
    from: {
      email: "noreply@mail-sender.dev"
    },
    content: [
      {
        type: "text/plain",
        value: params.content
      }
    ]
  };

  if (params.cc && params.to !== params.cc) {
    body.personalizations[0].cc = [{ email: params.cc }];
  }

  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      // eslint-disable-next-line no-undef
      Authorization: `Bearer ${SENDGRID_KEY}`
    },
    body: JSON.stringify(body)
  })
    .then(d => console.log(d))
    .catch(e => console.error(e));
};
