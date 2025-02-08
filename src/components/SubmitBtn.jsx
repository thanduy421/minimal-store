import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ text = 'submit' }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          Sending...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitBtn;
