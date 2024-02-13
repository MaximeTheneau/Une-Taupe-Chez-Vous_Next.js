export default function Select({ onChange, value, id }) {
  return (
    <select
      id={id}
      title="Sujet"
      name="subject"
      value={value}
      onChange={onChange}
    >
      <option value="Demande de renseignements">Demande de renseignements</option>
      <option value="Demande de devis">Demande de devis</option>
      <option value="Autre">Autre</option>
      <option value="Webmaster">Webmaster</option>
    </select>
  );
}
