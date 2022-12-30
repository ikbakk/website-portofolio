import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex flex-col space-y-9 justify-center text-accent items-center h-screen'>
      <RotatingLines
        strokeColor='grey'
        strokeWidth='5'
        animationDuration='0.75'
        width='96'
        visible={true}
      />
      <h2>Please Wait</h2>
    </div>
  )
}

export default Loading
