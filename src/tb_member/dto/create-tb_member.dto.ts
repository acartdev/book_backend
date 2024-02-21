enum Role {
  user = 'user',
  admin = 'admin',
  librarian = 'librarian',
}
export class CreateTbMemberDto {
  m_user: string;
  m_name: string;
  m_phone: string;
  m_role: Role;
  m_pass: string;
}
