import { T, useGT } from 'gt-react-native';
import { useState } from 'react';
import { Linking, Pressable, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/screen';
import { PageMeta } from '@/components/seo';
import { Body, Heading, OrangeButton, phoneLinkProps, Section } from '@/components/ui';
import { EmailJs, isEmailJsConfigured, Site } from '@/constants/site';
import { Colors, Fonts, Spacing } from '@/constants/theme';

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message?: string };

function Field({
  label,
  required,
  multiline,
  keyboardType,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: 'email-address' | 'phone-pad';
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
}) {
  const gt = useGT();
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
        {label} {required ? <Text style={{ color: Colors.orange }}>*</Text> : <Text style={{ color: Colors.textSecondary, textTransform: 'none' }}>{gt('(optional)')}</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B6F76"
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={{
          backgroundColor: Colors.surfaceAlt,
          borderWidth: 1,
          borderColor: Colors.border,
          borderRadius: 8,
          paddingHorizontal: 14,
          paddingVertical: 12,
          color: Colors.white,
          fontSize: 15,
          minHeight: multiline ? 120 : undefined,
        }}
      />
    </View>
  );
}

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const gt = useGT();

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ kind: 'error', message: gt('Please fill in your name, email, and message.') });
      return;
    }

    if (!isEmailJsConfigured()) {
      // EmailJS keys not set yet: open the visitor's email app with the message pre-filled.
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
      Linking.openURL(
        `mailto:${Site.email}?subject=${encodeURIComponent(`New Inquiry from ${name}`)}&body=${encodeURIComponent(body)}`
      );
      setStatus({ kind: 'success', message: gt('Your email app should open with the message ready to send.') });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EmailJs.serviceId,
          template_id: EmailJs.templateId,
          user_id: EmailJs.publicKey,
          template_params: { name, email, phone, message },
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setStatus({ kind: 'success', message: gt('Thank you! Your message has been sent. We\u2019ll get back to you shortly.') });
    } catch {
      setStatus({
        kind: 'error',
        message: gt('Something went wrong sending your message. Please call us at {phone} or try again.', { phone: Site.phoneDisplay }),
      });
    }
  };

  return (
    <Screen ctaTitle={gt('Prefer to Talk? Call Us Now')}>
      <PageMeta title="Contact Us | Dynamic Roofing | Dallas, GA" description="Contact Dynamic Roofing and Construction for a free roof inspection. Call (404) 784-9030, send a message, or schedule online." />

      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Heading level={1}>
          <T>Contact Us</T>
        </Heading>
        <Body style={{ fontSize: 16 }}>
          <T>
            Send us a message, give us a call, or book your free roof inspection directly on our calendar — whichever is
            easiest for you.
          </T>
        </Body>
        <Pressable {...phoneLinkProps()}>
          <Text style={{ color: Colors.orange, fontFamily: Fonts.heading, fontSize: 28 }}>{Site.phoneDisplay}</Text>
        </Pressable>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Send Us a Message</T>
        </Heading>
        <View style={{ gap: Spacing.md, maxWidth: 560 }}>
          <Field label={gt('Name')} required value={name} onChangeText={setName} placeholder={gt('Your name')} />
          <Field label={gt('Email')} required keyboardType="email-address" value={email} onChangeText={setEmail} placeholder={gt('Your email')} />
          <Field label={gt('Phone')} keyboardType="phone-pad" value={phone} onChangeText={setPhone} placeholder={gt('Your phone number')} />
          <Field label={gt('Message')} required multiline value={message} onChangeText={setMessage} placeholder={gt('How can we help you?')} />
          <OrangeButton label={status.kind === 'sending' ? gt('Sending\u2026') : gt('Send Message')} onPress={handleSubmit} />
          {status.message ? (
            <Body style={{ color: status.kind === 'error' ? '#FF6B6B' : '#7ED07E' }}>{status.message}</Body>
          ) : null}
        </View>
      </Section>

      <Section style={{ gap: Spacing.md }}>
        <Heading level={2}>
          <T>Schedule Your Free Inspection</T>
        </Heading>
        <Body>
          <T>Prefer to book a time? Pick a slot on our calendar and we{'\u2019'}ll be there.</T>
        </Body>
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label={gt('Schedule Appointment')} onPress={() => Linking.openURL(Site.calendlyUrl)} />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.md }}>
        <Heading level={2}>
          <T>Follow Us</T>
        </Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg }}>
          {Site.socials.map((s) => (
            <Pressable key={s.label} onPress={() => Linking.openURL(s.url)}>
              <Text style={{ color: Colors.orange, fontFamily: Fonts.headingMedium, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
                {s.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Section>
    </Screen>
  );
}
