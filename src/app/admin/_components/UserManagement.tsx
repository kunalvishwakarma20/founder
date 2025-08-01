'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { setRole, removeRole } from '../_actions'
import { toast } from 'sonner'

interface User {
  id: string
  firstName: string | null
  lastName: string | null
  emailAddresses: Array<{ id: string, emailAddress: string }>
  primaryEmailAddressId: string
  publicMetadata: { role?: string }
}

interface Props {
  users: User[]
}

// Add type definition for the expected response
interface RoleUpdateResponse {
  success: boolean;
  message: string;
}

export default function UserManagement({ users }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleRoleUpdate = async (formData: FormData) => {
    const result = await setRole(formData) as RoleUpdateResponse;  // Type assertion
    if (result.success) {
      toast.success(result.message)
      router.refresh()
    } else {
      toast.error(result.message as string)
    }
  }

  const handleRoleRemoval = async (formData: FormData) => {
    const result = await removeRole(formData) as RoleUpdateResponse
    if (result.success) {
      toast.success(result.message as string)
      router.refresh()
    } else {
      toast.error(result.message as string)
    }
  }

  const filteredUsers = users.filter(user => 
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.emailAddresses.some(email => 
      email.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {user.emailAddresses.find(email => 
                    email.id === user.primaryEmailAddressId
                  )?.emailAddress}
                </p>
                <p className="text-sm text-gray-500">
                  Current Role: {user.publicMetadata.role || 'None'}
                </p>
              </div>
              <div className="flex gap-2">
                <form action={handleRoleUpdate}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="hidden" name="role" value="admin" />
                  <Button 
                    type="submit"
                    variant={user.publicMetadata.role === 'admin' ? 'outline' : 'default'}
                  >
                    Make Admin
                  </Button>
                </form>
                <form action={handleRoleRemoval}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button type="submit" variant="destructive">
                    Remove Role
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 