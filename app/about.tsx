import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { experiences, values, YOUTUBE_CHANNEL_URL, youtubeVideos } from '@/constants/about-content';
import { CONTACT } from '@/constants/contact';
import { POLICY_LINKS } from '@/constants/policies';
import { SOCIAL_URLS } from '@/constants/social';
import { radius, spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

const STORY_IMAGE =
  'https://images.pexels.com/photos/29469922/pexels-photo-29469922.jpeg';

export default function AboutScreen() {
  const router = useRouter();
  const c = useSemanticPalette();

  const openYoutube = (videoId: string) => {
    void WebBrowser.openBrowserAsync(`https://www.youtube.com/watch?v=${videoId}`);
  };

  const openYoutubeChannel = () => {
    void WebBrowser.openBrowserAsync(YOUTUBE_CHANNEL_URL);
  };

  const openSocial = (url: string) => {
    void WebBrowser.openBrowserAsync(url);
  };

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: c.background }]}
      contentContainerStyle={styles.scroll}>
      <ThemedView style={[styles.hero, { backgroundColor: c.muted }]}>
        <ThemedText style={[styles.kicker, { color: c.primary }]}>Who we are</ThemedText>
        <ThemedText type="title" style={styles.heroTitle}>
          About Purple Spring
        </ThemedText>
        <ThemedText style={styles.heroLead}>
          Bringing you the finest saffron and organic products, sourced directly from trusted farms
          with love and care.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <View style={styles.storyRow}>
          <Image
            source={{ uri: STORY_IMAGE }}
            style={[styles.storyImage, { borderColor: c.border }]}
            contentFit="cover"
            accessibilityLabel="Saffron farm"
          />
          <View style={styles.storyText}>
            <ThemedText type="subtitle">Our story</ThemedText>
            <ThemedText style={styles.p}>
              Purple Spring was born from a passion for bringing authentic, premium quality saffron
              and organic products to your kitchen. Our journey began in the beautiful valleys of
              Kashmir, where we discovered the world&apos;s finest saffron.
            </ThemedText>
            <ThemedText style={styles.p}>
              We work directly with farmers who have been cultivating saffron for generations,
              ensuring that every strand is handpicked with care and expertise. Our commitment
              extends beyond saffron to a carefully curated selection of organic spices, honey, and
              specialty products.
            </ThemedText>
            <ThemedText style={styles.p}>
              Today, Purple Spring is trusted by thousands of customers across India who value
              quality, authenticity, and the rich flavors that only genuine organic products can
              provide.
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={[styles.sectionMuted, { backgroundColor: c.muted }]}>
        <ThemedText style={[styles.kicker, { color: c.primary }]}>Showcasing our work</ThemedText>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Expos, programs & partnerships
        </ThemedText>
        <ThemedText style={styles.sectionLead}>
          A few places we&apos;ve shown up—sharing our products, learning from peers, and staying
          connected to India&apos;s food, agri, and entrepreneurship ecosystem.
        </ThemedText>

        {experiences.map((item) => (
          <View key={item.headline} style={styles.experienceCard}>
            <Image
              source={{ uri: item.image }}
              style={[styles.experienceImage, { borderColor: c.border }]}
              contentFit="cover"
              accessibilityLabel={item.imageAlt}
            />
            <View style={[styles.tag, { backgroundColor: c.card, borderColor: c.border }]}>
              <ThemedText style={[styles.tagText, { color: c.primary }]}>{item.tag}</ThemedText>
            </View>
            <ThemedText style={[styles.meta, { color: c.mutedForeground }]}>
              {item.location}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.experienceHeadline}>
              {item.headline}
            </ThemedText>
            <ThemedText style={styles.p}>{item.description}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.centerTitle}>
          Our values
        </ThemedText>
        <ThemedText style={[styles.centerSub, { color: c.mutedForeground }]}>
          What makes Purple Spring different
        </ThemedText>
        <View style={styles.valuesGrid}>
          {values.map((value) => (
            <View
              key={value.title}
              style={[styles.valueCard, { borderColor: c.border, backgroundColor: c.card }]}>
              <View style={[styles.valueIconWrap, { backgroundColor: c.muted }]}>
                <IconSymbol name={value.icon} size={28} color={c.primary} />
              </View>
              <ThemedText type="defaultSemiBold" style={styles.valueTitle}>
                {value.title}
              </ThemedText>
              <ThemedText style={[styles.p, styles.valueDesc]}>{value.description}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={[styles.section, { paddingBottom: spacing[4] }]}>
        <ThemedText style={[styles.kicker, { color: c.primary }]}>Watch on YouTube</ThemedText>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Videos from Purple Spring
        </ThemedText>
        <ThemedText style={styles.sectionLead}>
          Tap below to watch in your browser—full player on YouTube.
        </ThemedText>

        {youtubeVideos.map((video, index) => (
          <Pressable
            key={`${video.videoId}-${index}`}
            accessibilityRole="button"
            accessibilityLabel={`Watch on YouTube: ${video.title}`}
            onPress={() => openYoutube(video.videoId)}
            style={({ pressed }) => [
              styles.videoCard,
              { borderColor: c.border, opacity: pressed ? 0.92 : 1 },
            ]}>
            <Image
              source={{ uri: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg` }}
              style={styles.videoThumb}
              contentFit="cover"
            />
            <View style={styles.videoText}>
              <ThemedText type="defaultSemiBold">{video.title}</ThemedText>
              <ThemedText style={styles.p}>{video.description}</ThemedText>
              <ThemedText type="link" style={styles.watchLink}>
                Watch on YouTube
              </ThemedText>
            </View>
          </Pressable>
        ))}
        <Button
          variant="outline"
          onPress={openYoutubeChannel}
          accessibilityLabel="Open Purple Spring on YouTube"
          style={styles.moreVideosBtn}>
          More videos..
        </Button>
      </ThemedView>

      <ThemedView style={[styles.section, styles.helpSection]}>
        <ThemedText style={[styles.kicker, { color: c.primary }]}>Help & legal</ThemedText>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Frequently asked questions
        </ThemedText>
        <ThemedText style={[styles.sectionLead, styles.helpLead]}>
          Answers about authenticity, storage, shipping, returns, and more.
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open frequently asked questions"
          onPress={() => router.push('/faq')}
          style={({ pressed }) => [
            styles.linkRow,
            { borderColor: c.border, backgroundColor: c.card, opacity: pressed ? 0.9 : 1 },
          ]}>
          <ThemedText type="defaultSemiBold" style={styles.linkRowText}>
            View all FAQs
          </ThemedText>
          <IconSymbol name="chevron.right" size={22} color={c.mutedForeground} />
        </Pressable>

        <ThemedText type="subtitle" style={styles.subheading}>
          Policies
        </ThemedText>
        {POLICY_LINKS.map((item) => (
          <Pressable
            key={item.slug}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => router.push({ pathname: '/policy/[id]', params: { id: item.slug } })}
            style={({ pressed }) => [
              styles.linkRow,
              { borderColor: c.border, backgroundColor: c.card, opacity: pressed ? 0.9 : 1 },
            ]}>
            <ThemedText style={styles.linkRowText}>{item.label}</ThemedText>
            <IconSymbol name="chevron.right" size={22} color={c.mutedForeground} />
          </Pressable>
        ))}

        <ThemedText type="subtitle" style={styles.subheading}>
          Contact us
        </ThemedText>
        <View style={[styles.contactCard, { borderColor: c.border, backgroundColor: c.card }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Email ${CONTACT.email}`}
            onPress={() => void Linking.openURL(`mailto:${CONTACT.email}`)}
            style={({ pressed }) => [styles.contactBlock, pressed && { opacity: 0.85 }]}>
            <ThemedText style={[styles.contactLabel, { color: c.mutedForeground }]}>Email</ThemedText>
            <ThemedText type="link" style={[styles.contactValue, { color: c.primary }]}>
              {CONTACT.email}
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Call ${CONTACT.phoneDisplay}`}
            onPress={() => void Linking.openURL(`tel:${CONTACT.phoneTel}`)}
            style={({ pressed }) => [styles.contactBlock, pressed && { opacity: 0.85 }]}>
            <ThemedText style={[styles.contactLabel, { color: c.mutedForeground }]}>Phone</ThemedText>
            <ThemedText type="link" style={[styles.contactValue, { color: c.primary }]}>
              {CONTACT.phoneDisplay}
            </ThemedText>
          </Pressable>
          <View style={styles.contactBlock}>
            <ThemedText style={[styles.contactLabel, { color: c.mutedForeground }]}>Address</ThemedText>
            {CONTACT.addressLines.map((line) => (
              <ThemedText key={line} style={styles.contactAddressLine}>
                {line}
              </ThemedText>
            ))}
          </View>
        </View>

        <ThemedText type="subtitle" style={styles.subheading}>
          Follow us
        </ThemedText>
        <View style={[styles.socialCard, { borderColor: c.border, backgroundColor: c.card }]}>
          <ThemedText style={[styles.socialHint, { color: c.mutedForeground }]}>
            Facebook, Instagram, and X (Twitter)—tap an icon to open in your browser.
          </ThemedText>
          <View style={styles.socialRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Purple Spring on Facebook"
              onPress={() => openSocial(SOCIAL_URLS.facebook)}
              style={({ pressed }) => [styles.socialBtn, pressed && styles.socialBtnPressed]}>
              <FontAwesome5 name="facebook" size={28} color={c.primary} brand />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Purple Spring on Instagram"
              onPress={() => openSocial(SOCIAL_URLS.instagram)}
              style={({ pressed }) => [styles.socialBtn, pressed && styles.socialBtnPressed]}>
              <FontAwesome5 name="instagram" size={28} color={c.primary} brand />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Purple Spring on X"
              onPress={() => openSocial(SOCIAL_URLS.twitter)}
              style={({ pressed }) => [styles.socialBtn, pressed && styles.socialBtnPressed]}>
              <FontAwesome5 name="twitter" size={28} color={c.primary} brand />
            </Pressable>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={[styles.cta, { backgroundColor: c.primary }]}>
        <ThemedText style={[styles.ctaTitle, { color: c.primaryForeground }]}>
          Experience the Purple Spring difference
        </ThemedText>
        <ThemedText style={[styles.ctaLead, { color: c.primaryForeground, opacity: 0.95 }]}>
          Join our family of satisfied customers who trust us for authentic, premium organic
          products
        </ThemedText>
        <Button
          variant="default"
          onPress={() => router.push('/(tabs)/shop')}
          size="lg"
          textStyle={{ color: c.foreground }}
          style={[styles.ctaBtn, { backgroundColor: c.chart2 }]}>
          Shop now
        </Button>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingBottom: 40 },
  hero: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[8],
    gap: spacing[3],
  },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroTitle: { textAlign: 'center' },
  heroLead: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[6],
    gap: spacing[4],
  },
  sectionMuted: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[6],
    gap: spacing[4],
  },
  sectionTitle: { marginTop: spacing[1] },
  sectionLead: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.85,
    marginBottom: spacing[2],
  },
  storyRow: { gap: spacing[5] },
  storyImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.xl,
    borderWidth: 1,
  },
  storyText: { gap: spacing[3] },
  p: { fontSize: 16, lineHeight: 24, opacity: 0.9 },
  experienceCard: { gap: spacing[2], marginBottom: spacing[6] },
  experienceImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: 999,
    borderWidth: 1,
    marginTop: spacing[2],
  },
  tagText: { fontSize: 12, fontWeight: '700' },
  meta: { fontSize: 14, marginTop: spacing[2] },
  experienceHeadline: { fontSize: 20, lineHeight: 26 },
  centerTitle: { textAlign: 'center' },
  centerSub: { textAlign: 'center', fontSize: 16 },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
    justifyContent: 'space-between',
  },
  valueCard: {
    width: '100%',
    padding: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing[2],
  },
  valueIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  valueTitle: { fontSize: 17 },
  valueDesc: { fontSize: 14, lineHeight: 20 },
  videoCard: {
    flexDirection: 'row',
    gap: spacing[3],
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing[4],
  },
  videoThumb: { width: 120, minHeight: 100 },
  videoText: { flex: 1, paddingVertical: spacing[3], paddingRight: spacing[3], gap: spacing[1] },
  watchLink: { marginTop: spacing[1] },
  moreVideosBtn: {
    marginTop: spacing[2],
    alignSelf: 'stretch',
  },
  cta: {
    marginHorizontal: spacing[5],
    marginBottom: spacing[6],
    padding: spacing[6],
    borderRadius: radius.xl,
    alignItems: 'center',
    gap: spacing[3],
  },
  ctaTitle: { fontSize: 26, fontWeight: '700', textAlign: 'center' },
  ctaLead: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  ctaBtn: { alignSelf: 'stretch', marginTop: spacing[2] },
  helpSection: { paddingBottom: spacing[4] },
  helpLead: { marginBottom: spacing[2] },
  subheading: { marginTop: spacing[5], marginBottom: spacing[2] },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  linkRowText: { flex: 1, fontSize: 16 },
  contactCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing[4],
    gap: spacing[4],
  },
  contactBlock: { gap: 4 },
  contactLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6 },
  contactValue: { fontSize: 16 },
  contactAddressLine: { fontSize: 15, lineHeight: 22, opacity: 0.95 },
  socialCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing[4],
    gap: spacing[3],
  },
  socialHint: { fontSize: 13, lineHeight: 18 },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: spacing[4],
    paddingVertical: spacing[2],
  },
  socialBtn: {
    padding: spacing[3],
    borderRadius: 999,
  },
  socialBtnPressed: { opacity: 0.65 },
});
