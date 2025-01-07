import BaseInfoUser from "@/components/account/admin/users/BaseInfoUser"

export default async function InfoUserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <BaseInfoUser id={id}/>
  )
}