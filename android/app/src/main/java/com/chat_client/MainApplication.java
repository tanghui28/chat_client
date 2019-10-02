package com.chat_client;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;
import com.reactnativecomponent.barcode.RCTCapturePackage;

public class MainApplication extends Application implements ReactApplication {
  private ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // packages.add(new RCTCapturePackage());
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
      // return Arrays.<ReactPackage>asList(
      //     new MainReactPackage(),
      //     //添加以下代码
      //     new RCTCapturePackage()
      // );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };
  
  public void setReactNativeHost(ReactNativeHost reactNativeHost) {
    mReactNativeHost = reactNativeHost;
  }
 

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
