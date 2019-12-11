import React, {useState} from 'react';
import UserLoginPage from './Pages/UserLoginPage';
import UserSignUpPage from './Pages/UserSignUpPage';
import MainPage from './Pages/MainPage';
import DetailPage from './Pages/DetailPage';
import SearchPage from './Pages/SearchPage';
import ReviewPage from './Pages/ReviewPage';
import LOGIN from './Pages/LOGIN';
import UserProfilePage from './Pages/UserProfilePage';
import { BrowserRouter, Route,} from 'react-router-dom';

function App() {
  const [searchLists, setSearchList] = useState(null);
  const [detail, setDetail] = useState(null);
  const [photoIds, setPhotoId] = useState(null);
  const [profile, setProfile] = useState(null);
  
  return (
    <BrowserRouter>
      <Route path='/signup' exact render={() => <UserSignUpPage/>}/>
      <Route path='/login' exact render={() => <UserLoginPage/>}/>
      <Route path='/main/:userId?' render={() => <MainPage setSearchList={setSearchList} setPhotoId={setPhotoId}/>}/>
      <Route path='/detail/:businessId?/:userId?' render={()=> <DetailPage detail={detail} setSearchList={setSearchList} setPhotoId={setPhotoId}/>}/>
      <Route path='/search/:userId?' render={()=> <SearchPage searchLists={searchLists} photoIds={photoIds} setDetail={setDetail} setSearchList={setSearchList} setPhotoId={setPhotoId}/>}/>
      <Route path='/review/:businessId?/:userId?' render={()=> <ReviewPage setSearchList={setSearchList} setPhotoId={setPhotoId}/>}/>
      <Route path='/profile/:userId' render={() => <UserProfilePage setSearchList={setSearchList} setPhotoId={setPhotoId} profile={profile} setProfile={setProfile}/>}/>
    </BrowserRouter>
  );
}

export default App;
