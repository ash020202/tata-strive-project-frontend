import { ProfileSection } from '../components/profile/ProfileSection';
import { Orders } from './Orders';

export function Profile() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <ProfileSection />
        <div className="mt-8">
          <Orders />
        </div>
      </div>
    </div>
  );
}
