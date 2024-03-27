import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full max-w-3xl flex justify-center items-center flex-col'>
      <nav className='fixed top-0 w-full bg-slate-100 px-6 z-10'>
        <div className='max-w-2xl flex justify-between items-center mx-auto py-3'>
          <a
            href='https://www.linkedin.com/in/hemanth-kumar-boddeda/'
            target='_blank'
            rel='noreferrer'
            className='custom_logo'
          >
            S{/* <img src={logo} alt='logo' className='w-10 object-contain' /> */}
          </a>
          <button
            type='button'
            onClick={() => {
              window.open('https://github.com/hemanth-kumar-boddeda');
            }}
            className='custom_btn'
          >
            GitHub
          </button>
        </div>
      </nav>

      <h5 className='head_text'>
        Analyze video descriptions using <br className='max-md:hidden' />
        <span className='orange_gradient'>OpenAI GPT-3.5</span>
      </h5>
      <h2 className='desc'>
        Analyzing the content of video descriptions and resulting best seo results
      </h2>
    </header>
  );
};

export default Hero;

/* 
sm:pl-16 sm:pr-16 pl-6 pr-6
sm:px-16 md:px-12
*/
