export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="message error-message" role="alert">
      <b>Что-то пошло не так</b>
      <p>{message}</p>
    </div>
  );
}
