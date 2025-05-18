'use client';

import { useTranslation } from '@/i18n/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const ContactPage = () => {
  // Get language from URL params
  const params = useParams();
  const lng = params.lng as string;

  // Use translation hook
  const { t } = useTranslation(lng);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
    companyName: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitError(t('contact.error.required_fields', 'Please fill in all required fields'));
      return;
    }

    // Reset error state
    setSubmitError('');
    setIsSubmitting(true);

    try {
      // Send data to the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'info@solo-sauce.com',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      // Show success message
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phone: '',
        companyName: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(t('contact.error.submission', 'There was an error submitting your message. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-12 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact/contact-bg.jpg"
          alt={t('contact.background_alt', 'Contact Background')}
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="opacity-90"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Contact Form Section */}
        <div className="max-w-6xl mx-auto">
          {/* Form Header */}

          {/* Form and Image Container */}
          <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Left Side - Form or Success Message */}
            <div className="w-full lg:w-1/2 p-6 md:p-10">
              {!submitSuccess ? (
                <>
                  {/* Form Header - Added "Contact Us" header */}
                  <h3 className="font-['Dancing_Script'] font-semibold text-[32px] md:text-[48px] leading-[1.2em] text-[#DBB58F] mb-6 text-center">
                    {t('contact.form_header', 'Contact Us')}
                  </h3>

                  {/* Form Content */}
                  <form onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {submitError && (
                      <div className="bg-red-50 p-4 mb-6 rounded">
                        <p className="font-['Montserrat'] text-red-600">{submitError}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="flex flex-col">
                        <label htmlFor="firstName" className="font-['Montserrat'] font-medium text-black mb-2">
                          {t('contact.form.first_name', 'First Name')} *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.first_name_placeholder', 'Enter your first name')}
                          required
                          className="border border-gray-300 rounded-md px-4 py-3 font-['Montserrat'] focus:outline-none focus:border-[#DBB58F] placeholder-gray-500 text-black"
                        />
                      </div>

                      {/* Last Name */}
                      <div className="flex flex-col">
                        <label htmlFor="lastName" className="font-['Montserrat'] font-medium text-black mb-2">
                          {t('contact.form.last_name', 'Last Name')} *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.last_name_placeholder', 'Enter your last name')}
                          required
                          className="border border-gray-300 rounded-md px-4 py-3 font-['Montserrat'] focus:outline-none focus:border-[#DBB58F] placeholder-gray-500 text-black"
                        />
                      </div>

                      {/* Email - Modified to span full width */}
                      <div className="flex flex-col md:col-span-2">
                        <label htmlFor="email" className="font-['Montserrat'] font-medium text-black mb-2">
                          {t('contact.form.email', 'Email')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.email_placeholder', 'Enter your email address')}
                          required
                          className="border border-gray-300 rounded-md px-4 py-3 font-['Montserrat'] focus:outline-none focus:border-[#DBB58F] placeholder-gray-500 text-black"
                        />
                      </div>

                      {/* Country */}
                      <div className="flex flex-col">
                        <label htmlFor="country" className="font-['Montserrat'] font-medium text-black mb-2">
                          {t('contact.form.country', 'Country')}
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.country_placeholder', 'Enter your country')}
                          className="border border-gray-300 rounded-md px-4 py-3 font-['Montserrat'] focus:outline-none focus:border-[#DBB58F] placeholder-gray-500 text-black"
                        />
                      </div>

                      {/* Phone Number with Country Code */}
                      <div className="flex flex-col">
                        <label htmlFor="phone" className="font-['Montserrat'] font-medium text-black mb-2">
                          {t('contact.form.phone', 'Contact Number')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.phone_placeholder', '+20 100 229 9067')}
                          className="border border-gray-300 rounded-md px-4 py-3 font-['Montserrat'] focus:outline-none focus:border-[#DBB58F] placeholder-gray-500 text-black"
                        />
                      </div>

                      {/* Company Name - Modified to span full width */}
                      <div className="flex flex-col md:col-span-2">
                        <label htmlFor="companyName" className="font-['Montserrat'] font-medium text-black mb-2">
                          {t('contact.form.company_name', 'Company Name')}
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.company_name_placeholder', 'Enter your company name')}
                          className="border border-gray-300 rounded-md px-4 py-3 font-['Montserrat'] focus:outline-none focus:border-[#DBB58F] placeholder-gray-500 text-black"
                        />
                      </div>

                      {/* Message - Span 2 columns */}
                      <div className="flex flex-col md:col-span-2">
                        <label htmlFor="message" className="font-['Montserrat'] font-medium text-black mb-2">
                          {t('contact.form.message', 'Message')} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder={t('contact.form.message_placeholder', 'Enter your message')}
                          className="border border-gray-300 rounded-md px-4 py-3 font-['Montserrat'] focus:outline-none focus:border-[#DBB58F] resize-none placeholder-gray-500 text-black"
                        ></textarea>
                      </div>

                      {/* Submit Button - Span 2 columns and center */}
                      <div className="md:col-span-2 flex justify-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#DBB58F] text-white font-['Montserrat'] font-bold py-3 px-8 rounded-md hover:bg-[#c9a57f] transition-colors duration-300 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center space-x-2">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>{t('contact.form.submitting', 'Submitting...')}</span>
                            </span>
                          ) : (
                            t('contact.form.submit', 'Submit')
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-10">
                  {/* Thanks Header */}
                  <h3 className="font-['Dancing_Script'] font-semibold text-[40px] md:text-[64px] leading-[1.2em] text-black mb-10 text-center">
                    {t('contact.success.thanks', 'Thanks')}
                  </h3>

                  {/* Success Illustration */}
                  <div className="w-64 h-64">
                    <Image
                      src="/images/contact/message-success.svg"
                      alt={t('contact.success.icon_alt', 'Message sent successfully')}
                      width={256}
                      height={256}
                      className="object-contain"
                    />
                  </div>

                  {/* Success Message */}
                  <h4 className="font-['Montserrat'] font-bold text-xl md:text-3xl text-[#202020] mb-4 text-center">
                    {t('contact.success.title', 'We have received your request')}
                  </h4>

                  {/* Success Description */}
                  <p className="font-['Montserrat'] text-lg md:text-2xl text-gray-500 max-w-md text-center">
                    {t('contact.success.description', 'We will contact you as soon as possible. Thank you.')}
                  </p>
                </div>
              )}
            </div>

            {/* Right Side - Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="h-full w-full">
                <Image
                  src="/images/contact/solo-sauce-contact.jpg"
                  alt={t('contact.product_image_alt', 'Solo Sauce Products')}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="h-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="max-w-6xl mx-auto mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="py-8 px-6 text-center border-b border-gray-100">
              <h2 className="font-['Dancing_Script'] font-semibold text-[32px] md:text-[48px] leading-[1.2em] text-black mb-2">
                {t('contact.company_info.title', 'Get in Touch')}
              </h2>
            </div>

            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-black mb-4">
                    {t('contact.company_info.address_title', 'Address')}
                  </h3>
                  <p className="font-['Montserrat'] text-gray-700 mb-2">
                    {t('footer.address', 'Industrial Zone B.G. Obour City - Qalyubia - Egypt.')}
                  </p>
                </div>

                <div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-black mb-4">
                    {t('contact.company_info.contact_title', 'Contact Information')}
                  </h3>
                  <p className="font-['Montserrat'] text-gray-700 mb-2">
                    {t('contact.company_info.email', 'Email')}: info@solo-sauce.com
                  </p>
                  <p className="font-['Montserrat'] text-gray-700 mb-2">
                    {t('contact.company_info.phone', 'Phone')}: +201002299067
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
