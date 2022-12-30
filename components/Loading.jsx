import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex flex-col space-y-9 justify-center text-accent items-center h-screen'>
      <ThreeDots
        width={120}
        radius='10'
        color='#2b9ea0'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClassName=''
        visible={true}
      />
      <h2>Please Wait</h2>
    </div>
  )
}

export default Loading
