import img from './error.gif';

const ErrorMessege = () => {
    return (
        <img style={{ display: 'block', width: '250px', height: '250px', objectFit:
        'contain', margin: '0 auto'}} src={img} alt='Error gif'/>
    )
}

export default ErrorMessege;

