import { Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../validations/contact.schema';
import { FormInput } from '../components/forms/FormInput';
import { FormTextarea } from '../components/forms/FormTextarea';
import type { ContactFormData } from '../validations/contact.schema';
import { useAuth } from '../contexts/AuthContext';
import { contactForm } from '../service/userService';
import { toast } from 'sonner';

export function Contact() {
  const { userData, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to contact us.');
      // navigate('/');
    }
    try {
      const response = await contactForm({
        ...data,
        userId: userData?.id || '',
      });
      toast.success(response.message);
      reset();
      // navigate('/');
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-2xl px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            register={register}
            icon={User}
            error={errors.name?.message}
            placeholder="Your name"
          />

          <FormInput
            label="Email"
            name="email"
            register={register}
            icon={Mail}
            error={errors.email?.message}
            placeholder="your.email@example.com"
          />

          <FormTextarea
            label="Message"
            name="message"
            register={register}
            error={errors.message?.message}
            placeholder="How can we help you?"
            rows={4}
          />

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Send Message'}
          </button>
        </form>

        <div className="p-6 mt-12 rounded-lg bg-gray-50">
          <h2 className="mb-4 text-xl font-semibold">Other Ways to Reach Us</h2>
          <div className="space-y-4 text-gray-600">
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@gourmethaven.com</p>
            <p>Address: 123 Gourmet Street, Foodie City, FC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
