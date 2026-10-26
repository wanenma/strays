
import { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type CatPost = {
  id: string;
  friend: string;
  time: string;
  caption: string;
  image: string;
  likes: number;
};

const SAMPLE_POSTS: CatPost[] = [
  {
    id: '1',
    friend: 'Maya',
    time: '12 min ago',
    caption: 'Found this little explorer on my way home 🐈',
    image:
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900',
    likes: 12,
  },
  {
    id: '2',
    friend: 'Adam',
    time: '38 min ago',
    caption: 'This face made my entire day.',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900',
    likes: 8,
  },
  {
    id: '3',
    friend: 'Sarah',
    time: '1 hr ago',
    caption: 'Neighborhood guardian on duty 🐾',
    image:
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=900',
    likes: 5,
  },
];

export default function HomeScreen() {
  const [myPhotos, setMyPhotos] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedPosts((current) =>
      current.includes(id)
        ? current.filter((postId) => postId !== id)
        : [...current, id],
    );
  };

  const handleCameraPress = () => {
    // We'll connect this button to the real device camera next.
    setMyPhotos((current) =>
      current.length >= 2 ? current : [...current, 'demo-photo'],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
  <Text style={styles.logo}>strays.</Text>

  <Pressable style={styles.avatar}>
    <Text style={styles.avatarText}>Y</Text>
  </Pressable>
</View>

        <View style={styles.todayHeader}>
          <Text style={styles.counter}>{myPhotos.length}/2</Text>
        </View>

        {myPhotos.length === 0 ? (
          <Pressable
            style={styles.cameraCard}
            onPress={handleCameraPress}
          >
            
            <Text style={styles.cameraTitle}>Spotted a stray?</Text>
            <View style={styles.cameraIconCircle}>
    <Image
      source={require('../../assets/camera.png')}
      style={styles.cameraIcon}
      resizeMode="contain"
    />
  </View>
            
            <Text style={styles.cameraHint}>
              Two Gattoes allowed each day
            </Text>
          </Pressable>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.myPhotosList}
          >
            {myPhotos.map((photo, index) => (
              <View key={`${photo}-${index}`} style={styles.myPhotoCard}>
                <View style={styles.myPhotoPlaceholder}>
                  <Text style={styles.myPhotoEmoji}>🐈</Text>
                </View>
                <Text style={styles.myPhotoLabel}>
                  Today's stray #{index + 1}
                </Text>
              </View>
            ))}
            {myPhotos.length < 2 && (
              <Pressable
                style={styles.addPhotoCard}
                onPress={handleCameraPress}
              >
                <Text style={styles.addPhotoPlus}>+</Text>
                <Text style={styles.addPhotoText}>Find another</Text>
              </Pressable>
            )}
          </ScrollView>
        )}

        <View style={styles.feedHeading}>
          <View>
            <Text style={styles.sectionTitle}>
              Fresh from your friends
            </Text>
            <Text style={styles.feedSubtitle}>
              See what they've discovered
            </Text>
          </View>
          <Text style={styles.liveDot}>● LIVE</Text>
        </View>

        {SAMPLE_POSTS.map((post) => {
          const isLiked = likedPosts.includes(post.id);

          return (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.friendAvatar}>
                  <Text style={styles.friendAvatarText}>
                    {post.friend[0]}
                  </Text>
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{post.friend}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
                <Text style={styles.postMenu}>•••</Text>
              </View>

              <Image
                source={{ uri: post.image }}
                style={styles.catImage}
                resizeMode="cover"
              />

              <View style={styles.postActions}>
                <Pressable
                  style={styles.likeButton}
                  onPress={() => toggleLike(post.id)}
                >
                  <Text style={styles.heart}>
                    {isLiked ? '♥' : '♡'}
                  </Text>
                  <Text style={styles.likeCount}>
                    {post.likes + (isLiked ? 1 : 0)}
                  </Text>
                </Pressable>
                <Text style={styles.catTag}>🐾 CAT SPOTTED</Text>
              </View>

              <Text style={styles.caption}>
                <Text style={styles.captionName}>{post.friend} </Text>
                {post.caption}
              </Text>
            </View>
          );
        })}

        <Text style={styles.endMessage}>
          That's all for now. Keep your eyes open for more strays 🐾
        </Text>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconActive}>⌂</Text>
          <Text style={styles.navTextActive}>Home</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>♛</Text>
          <Text style={styles.navText}>Ranks</Text>
        </Pressable>
        <Pressable
          style={styles.navCamera}
          onPress={handleCameraPress}
        >
          <Text style={styles.navCameraText}>+</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>♡</Text>
          <Text style={styles.navText}>Collection</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>○</Text>
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7F2',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position:'relative'
  },
  logo: {
    position: 'absolute',
    left:0,
    right:0,
    textAlign:'center',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1.5,
    color: '#254C35',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7C847A',
    marginTop: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E9DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D2DDCB',
  },
  avatarText: {
    color: '#315B3D',
    fontSize: 17,
    fontWeight: '800',
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#25382B',
    letterSpacing: -0.4,
  },
  counter: {
    color: '#477653',
    fontWeight: '800',
    fontSize: 13,
    backgroundColor: '#E7EDE2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cameraCard: {
    backgroundColor: '#E9EEE4',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#DFE6D9',
    height:200,
  },
  cameraIconCircle: {
  width: 150,
  height: 150,
  borderRadius: 100,
  backgroundColor: '#b5c0af93',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  overflow: 'hidden',
},

cameraIcon: {
  width: 120,
  height:120,
  resizeMode: 'contain',
},
    
  
  cameraTitle: {
    color: '#294B34',
    fontSize: 19,
    fontWeight: '800',
  },
  cameraDescription: {
    color: '#697568',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  cameraButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#315D3F',
    borderRadius: 13,
    paddingVertical: 14,
    marginTop: 17,
  },
  cameraButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  cameraHint: {
    color: '#7C8778',
    fontSize: 11,
  
  },
  myPhotosList: {
    gap: 12,
    paddingBottom: 4,
    marginBottom: 26,
  },
  myPhotoCard: {
    width: 132,
  },
  myPhotoPlaceholder: {
    height: 112,
    borderRadius: 16,
    backgroundColor: '#E4EBDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myPhotoEmoji: {
    fontSize: 38,
  },
  myPhotoLabel: {
    color: '#405342',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 7,
  },
  addPhotoCard: {
    width: 112,
    height: 112,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CDD9C7',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoPlus: {
    fontSize: 28,
    color: '#477653',
  },
  addPhotoText: {
    fontSize: 11,
    color: '#477653',
    marginTop: 3,
  },
  feedHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  feedSubtitle: {
    fontSize: 12,
    color: '#82877E',
    marginTop: 4,
  },
  liveDot: {
    fontSize: 10,
    color: '#477653',
    fontWeight: '800',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEEE7',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  friendAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E6EADD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendAvatarText: {
    color: '#355840',
    fontSize: 15,
    fontWeight: '800',
  },
  friendInfo: {
    flex: 1,
    marginLeft: 10,
  },
  friendName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#293D2E',
  },
  postTime: {
    fontSize: 11,
    color: '#8B9087',
    marginTop: 2,
  },
  postMenu: {
    color: '#788174',
    fontWeight: '800',
    letterSpacing: 2,
  },
  catImage: {
    width: '100%',
    height: 290,
    backgroundColor: '#E6EADD',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heart: {
    fontSize: 25,
    color: '#D56863',
  },
  likeCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#697568',
  },
  catTag: {
    color: '#477653',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  caption: {
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 17,
    color: '#586257',
    fontSize: 13,
    lineHeight: 19,
  },
  captionName: {
    color: '#293D2E',
    fontWeight: '800',
  },
  endMessage: {
    textAlign: 'center',
    color: '#8A9085',
    fontSize: 12,
    lineHeight: 19,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEDE6',
    paddingTop: 9,
    paddingBottom: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 53,
    gap: 3,
  },
  navIconActive: {
    fontSize: 25,
    color: '#315D3F',
    fontWeight: '800',
  },
  navIcon: {
    fontSize: 23,
    color: '#969B91',
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '800',
    color: '#315D3F',
  },
  navText: {
    fontSize: 10,
    color: '#969B91',
  },
  navCamera: {
    backgroundColor: '#315D3F',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    borderWidth: 4,
    borderColor: '#F8F7F2',
  },
  navCameraText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
