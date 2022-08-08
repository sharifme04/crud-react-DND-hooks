import Spinner from 'react-bootstrap/Spinner';

const CustomSpinner =()=> {
  return (
    <div className='spinner text-center'>
    <Spinner  animation="border" variant="primary" role="status">
      <span className="visually-hidden"
      >Loading...</span>
    </Spinner>
    </div>
  );
}

export default CustomSpinner;