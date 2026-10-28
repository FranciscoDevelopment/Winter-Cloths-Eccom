import EditProfileForm from "@/components/account/EditProfileForm";
import UserForm from "@/components/account/UserForm";
import Heading from "@/components/ui/Heading";

export default function AccountPage () {

    return(

        <main>

            <Heading>
                Edit Profile
            </Heading>

            <EditProfileForm>
                <UserForm/>
            </EditProfileForm>

        </main>

    )
}
