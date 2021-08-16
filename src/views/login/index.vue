<template>
  <div class="login">
    <!-- Login--登录模块 -->
    <section class="user">
      <div
        class="user_options-container"
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
      >
        <!-- 登录信息提示 -S -->
        <div class="user_options-text">
          <!-- 手机方式登录提示 -S -->
          <div class="user_options-phone">
            <h2 class="user_phone-title">账号密码方式登录</h2>
            <p class="user_phone-text">请输入绑定手机号和密码进行登录</p>
            <button
              class="user_phone-signup"
              id="signup-button"
              @click="signBtn"
            >
              使用邮箱进行登录
            </button>
          </div>
          <!-- 手机方式登录提示 -E -->

          <!-- 二维码方式登录提示 -S -->
          <div class="user_options-qrcode">
            <h2 class="user_qrcode-title">扫描二维码登录</h2>
            <p class="user_qrcode-text">
              Banjo tote bag bicycle rights, High Life sartorial cray craft beer
              whatever street art fap.
            </p>
            <button
              class="user_qrcode-login"
              id="login-button"
              @click="loginBtn"
            >
              登 录
            </button>
          </div>
          <!-- 二维码方式登录提示 -E -->
        </div>
        <!-- 登录信息提示 -E -->

        <div
          class="user_options-forms"
          id="user_options-forms"
          :class="{ bounceRight: isright, bounceLeft: isleft }"
        >
          <!-- 手机方式登录表单 -S -->
          <div class="user_forms-phone">
            <h2 class="forms_title">登 录</h2>
            <form class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input
                    type="text"
                    placeholder="请输入手机号"
                    class="forms_field-input"
                    required
                    autofocus
                    v-model.lazy="login_form.phone"
                  />
                </div>
                <div class="forms_field">
                  <input
                    type="password"
                    placeholder="请输入密码"
                    class="forms_field-input"
                    required
                    v-model.lazy="login_form.md5_password"
                  />
                </div>
              </fieldset>

              <div class="forms_buttons">
                <input
                  type="submit"
                  value="登录"
                  class="forms_buttons-action"
                  @click="phoneLogin"
                />
              </div>
            </form>
          </div>
          <!-- 手机方式登录表单 -E -->

          <!-- 二维码方式登录表单 -S -->
          <div class="user_forms-qrcode">
            <h2 class="forms_title">Sign Up</h2>
            <form class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input
                    type="text"
                    placeholder="Full Name"
                    class="forms_field-input"
                    required
                  />
                </div>
                <div class="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    class="forms_field-input"
                    required
                  />
                </div>
                <div class="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    class="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div class="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  class="forms_buttons-action"
                />
              </div>
            </form>
          </div>
          <!-- 二维码方式登录表单 -E -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { loginWithPhone } from '@/api/login.js'
import { getUserSonglist } from '@/api/songlist.js'
import md5 from 'js-md5'
export default {
  name: 'Login',
  data() {
    return {
      isright: false,
      isleft: false,
      // 用户输入的登录表单信息
      login_form: {
        phone: '',
        md5_password: '',
      },
    }
  },
  methods: {
    signBtn() {
      this.isleft = true
      this.isright = false
    },
    loginBtn() {
      this.isright = true
      this.isleft = false
    },
    async phoneLogin() {
      await loginWithPhone({
        phone: this.login_form.phone,
        md5_password: md5(this.login_form.md5_password).toString(),
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('登陆成功')
          // 将用户的token存入vuex中
          this.$store.dispatch('saveUserToken', res.data.token)
          // 将用户的信息存入vuex中
          this.$store.dispatch('saveUserInfo', res.data.profile)
          // 将用户的id传入用于获取用户私人歌单的函数中
          this.storeUserSonglisrt(res.data.profile.userId)
          // console.log(this.userId)
          this.$router.push('/explore')
        } else {
          this.$message.error('登陆失败，请验证登录信息！')
        }
      })
    },
    // 存储用户私人歌单
    storeUserSonglisrt(userId) {
      getUserSonglist({ uid: userId }).then((res) => {
        this.$store.dispatch('saveUserSonglist', res.data.playlist.slice(1))
      })
    },
  },
}
</script>

<style lang="scss" scoped>
body {
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type='submit'] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-size: 0.85rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
/**
 * * Show Sign Up form
 * */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
/**
 * * login background
 * */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - #{$player-height} - #{$header-height});
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: $br-30;
  // background: linear-gradient(
  //   135deg,
  //   hsl(170deg, 80%, 70%),
  //   hsl(190deg, 80%, 70%),
  //   hsl(250deg, 80%, 70%),
  //   hsl(320deg, 80%, 70%)
  // );
  // background-size: 100% 100%;
  // animation: gradient-move 5s ease-in-out alternate infinite;
  //  @keyframes gradient-move {
  //   0% {
  //     background-position: 0% 0%;
  //   }
  //   100% {
  //     background-position: 100% 100%;
  //   }
  // }
  background: linear-gradient(
    45deg,
    rgb(73, 146, 255),
    rgb(113, 255, 231),
    #fff
  );
}

/**
 * * phone and QR_code login box and text
 * */
.user_options-qrcode,
.user_options-phone {
  width: 50%;
  padding: 75px 45px;
  color: $black;
  font-weight: 500;
}

.user_qrcode-title,
.user_phone-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_phone-text,
.user_qrcode-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_qrcode-login,
.user_phone-signup {
  margin-top: 30px;
  border: 2px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_qrcode-login:hover,
.user_phone-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/**
 * * Login and signup forms
 * */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: $white;
  border-radius: $br-30;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;

  .user_forms-phone {
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  }

  .forms_fieldset {
    border: none;
  }

  .forms_title {
    margin-bottom: 45px;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1em;
    text-transform: uppercase;
    color: $aqua-green;
    letter-spacing: 0.1rem;
  }

  .forms_field:not(:last-of-type) {
    margin-bottom: 20px;
  }

  .forms_field-input {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 6px 20px 6px 6px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    color: gray;
    letter-spacing: 0.1rem;
    transition: border-color 0.2s ease-in-out;
    background-color: bisque;
    background: none;
    outline: none;
  }

  .forms_field-input:focus {
    border-color: gray;
  }

  .forms_buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
  }

  .forms_buttons-forgot {
    letter-spacing: 0.1rem;
    color: #ccc;
    text-decoration: underline;
    transition: color 0.2s ease-in-out;
  }

  .forms_buttons-forgot:hover {
    color: #b3b3b3;
  }

  .forms_buttons-action {
    position: absolute;
    right: 0;
    background-color: $aqua-green;
    border-radius: 3px;
    padding: 10px 35px;
    font-size: 1rem;
    font-weight: 300;
    color: #fff;
    letter-spacing: 0.1rem;
    transition: background-color 0.2s ease-in-out;
  }

  .forms_buttons-action:hover {
    background-color: #e14641;
  }

  .user_forms-phone,
  .user_forms-qrcode {
    position: absolute;
    top: 70px;
    left: 40px;
    width: calc(100% - 80px);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
      transform 0.5s ease-in-out;
  }

  .user_forms-qrcode {
    transform: translate3d(120px, 0, 0);

    .forms_buttons {
      justify-content: flex-end;
    }
  }

  .user_forms-phone {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    visibility: visible;
  }
}

/**
 * * Triggers
 * */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
  animation: bounceLeft 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-qrcode {
  -webkit-animation: showSignUp 1s forwards;
  animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-phone {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
  animation: bounceRight 1s forwards;
}
</style>