
type NoticeProps = {
  message: string
}

export const Notice = ({ message }: NoticeProps) => {
  return (
    <>
      <h3 className="">WebPush PWA</h3>
      <p className="">{message}</p>
    </>
  )
}
