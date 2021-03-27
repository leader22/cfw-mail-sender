const layout = children => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Mail sender</title>
  </head>
  <body>
    ${children}
  </body>
</html>
`;

export const index = () =>
  layout(`
<form action="/" method="POST">
  <div>
    <label>
      To
      <input type="email" name="to" required>
    </label>
  </div>
  <div>
    <label>
      Cc
      <input type="email" name="cc">
    </label>
  </div>
  <div>
    <label>
      Subject
      <input type="text" name="subject" required>
    </label>
  </div>
  <div>
    <label>
      Content
      <textarea name="content" required></textarea>
    </label>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
`);

export const result = () =>
  layout(`
<p>
  Your mail has sent!
</p>
<hr>
<a href="/">Back</a>
`);
