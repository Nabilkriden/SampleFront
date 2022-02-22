export default function ListeFrend({ frend }) {
  return (
    <li>
      <div className='item'>
        <span className='text'>{frend?.userFirstName}</span>
      </div>
    </li>
  );
}
