# Building Application for Android and Adding Deeplinks

## Generate keystore

We'll need it for signing the app, and generatign `assetlinks.json`

Generate it using the following command:

```sh
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

and get the SHA256 certificate with the following command.  We'll need it for
the `assetlinks.json` file.

```sh
keytool -list -v -keystore my-release-key.keystore

...
Certificate fingerprints:
        SHA1: BE:1B:B7:F8:F9:A1:C2:DC:D0:72:E4:58:C1:36:66:0B:F5:16:C7:1A
        SHA256: 15:69:6B:AC:59:88:F4:96:E1:A6:F4:2C:58:29:4A:80:15:B6:B2:D5:3E:B0:93:40:65:59:B4:F1:40:16:DE:92
...
```


## Compile application

### Setup

After modifying `capacitor.config.ts` to have the correct package name

```ts
...
const config: CapacitorConfig = {
  appId: 'com.exhibithub.application',
...
```

### Generate android project

You can use the following command to add android platform to our project (given that you've already installed `@capacitor/android`).

```sh
npx ionic cap add android
```

This will generate a new directory, `android/`, which is the root for our android build.

```sh
path-to-apksigner sign \
    --ks ../my-release-key.keystore --out my-app-release.apk ./app/build/outputs/apk/release/app-release-unsigned.apk
```

Now you can use the following command to build the project

```sh
npx ionic capacitor build android
```

This does 3 basic steps:

1. Builds the angular app: it compiles our typescript and sass code into
javascript and css files inside `www/`

    ```sh
    ng run app:build
    ```

1. Moves the build files (`www/`) into the android project (`android/`).

    ```sh
    capacitor sync android
    ```

1. Opens android studio so we can continue building the actual android binary by ourselves

    ```sh
    capacitor open android
    ```

    We then can compile the application just like any other android project
    without any ionic/andular specifics.



## Add Android App Links

### Generate and host assetlinks statement

Before we make our app handle our URL, we first have to prove the we own that
URL and that we want to link to it
[[1]](https://developer.android.com/training/app-links/index.html#android-app-links).


Vist the following
[website](https://developers.google.com/digital-asset-links/tools/generator),
and provide them with the site name, app package name, and SHA256 certificate.  This gave me the following 'statement':

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target" : { "namespace": "android_app", "package_name": "com.exhibithub.application",
               "sha256_cert_fingerprints": ["15:69:6B:AC:59:88:F4:96:E1:A6:F4:2C:58:29:4A:80:15:B6:B2:D5:3E:B0:93:40:65:59:B4:F1:40:16:DE:92"] }
}]
```

I hosted the above statement at
[http://exhibit.mzhubail.com/.well-known/assetlinks.json](http://exhibit.mzhubail.com/.well-known/assetlinks.json).



### Add intent filter

Add the following intent filter inside `android/app/src/main/AndroidManifest.xml`

```xml
<activity ...>

    ...

    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="exhibit.mzhubail.com" />
    </intent-filter>
</activity>
```

This tells android that our application wants to handle links to the domain
`exhibit.mzhubail.com`.


### Add listener inside the app

We need to add code to our app to handle when a user navigates to our app via a
URL.  The `App.addListener('appUrlOpen', ...)`, in the below code, registers an
event listener for the 'appUrlOpen' event, indicating that the app was opened
with a specific URL.

```ts
App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
    const domain = 'exhibit.mzhubail.com';
    const path = event.url.split(domain)[1];

    // alert(`path = ${path}, cond = ${path.startsWith('/test-deeplinks')}`)
    if (path.startsWith('/test-deeplinks'))
    this.router.navigateByUrl(path)
    else
    this.router.navigateByUrl('/home')
});
```

