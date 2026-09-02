import Head from 'expo-router/head';
import { useState } from 'react';
import { Linking, Pressable, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Body, Heading, OrangeButton, Section } from '@/components/ui';
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
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
        {label} {required ? <Text style={{ color: Colors.orange }}>*</Text> : <Text style={{ color: Colors.textSecondary, textTransform: 'none' }}>(optional)</Text>}
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

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ kind: 'error', message: 'Please fill in your name, email, and message.' });
      return;
    }

    if (!isEmailJsConfigured()) {
      // EmailJS keys not set yet: open the visitor's email app with the message pre-filled.
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
      Linking.openURL(
        `mailto:${Site.email}?subject=${encodeURIComponent(`New Inquiry from ${name}`)}&body=${encodeURIComponent(body)}`
      );
      setStatus({ kind: 'success', message: 'Your email app should open with the message ready to send.' });
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
      setStatus({ kind: 'success', message: 'Thank you! Your message has been sent. We\u2019ll get back to you shortly.' });
    } catch {
      setStatus({
        kind: 'error',
        message: `Something went wrong sending your message. Please call us at ${Site.phoneDisplay} or try again.`,
      });
    }
  };

  return (
    <Screen ctaTitle="Prefer to Talk? Call Us Now">
      <Head>
        <title>Contact Us | Dynamic Roofing | Powder Springs, GA</title>
        <meta
          name="description"
          content="Contact Dynamic Roofing and Construction for a free roof inspection. Call (404) 784-9030, send a message, or schedule online."
        />
      </Head>

      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Heading level={1}>Contact Us</Heading>
        <Body style={{ fontSize: 16 }}>
          Send us a message, give us a call, or book your free roof inspection directly on our calendar — whichever is
          easiest for you.
        </Body>
        <Pressable onPress={() => Linking.openURL(Site.phoneHref)}>
          <Text style={{ color: Colors.orange, fontFamily: Fonts.heading, fontSize: 28 }}>{Site.phoneDisplay}</Text>
        </Pressable>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>Send Us a Message</Heading>
        <View style={{ gap: Spacing.md, maxWidth: 560 }}>
          <Field label="Name" required value={name} onChangeText={setName} placeholder="Your name" />
          <Field label="Email" required keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="Your email" />
          <Field label="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} placeholder="Your phone number" />
          <Field label="Message" required multiline value={message} onChangeText={setMessage} placeholder="How can we help you?" />
          <OrangeButton label={status.kind === 'sending' ? 'Sending\u2026' : 'Send Message'} onPress={handleSubmit} />
          {status.message ? (
            <Body style={{ color: status.kind === 'error' ? '#FF6B6B' : '#7ED07E' }}>{status.message}</Body>
          ) : null}
        </View>
      </Section>

      <Section style={{ gap: Spacing.md }}>
        <Heading level={2}>Schedule Your Free Inspection</Heading>
        <Body>Prefer to book a time? Pick a slot on our calendar and we{'\u2019'}ll be there.</Body>
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label="Schedule Appointment" onPress={() => Linking.openURL(Site.calendlyUrl)} />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.md }}>
        <Heading level={2}>Follow Us</Heading>
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
