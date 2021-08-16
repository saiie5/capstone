/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import '../index.css'


function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const logOut =()=>{
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
    return (
      <div>
        <nav className="navbar navbar-expand-sm">
          <nav className="navbar-brand">
            Easy-Parking
          </nav>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
              <i class="fas fa-bars" style={{color:'white'}}></i>
            </span>
          </button>
          <div class="collapse navbar-collapse mr-5" id="navbarNav">
            <ul class="navbar-nav" style={{ marginRight: "200px" }}>
              {user ? (
                <>
                  <div class="dropdown">
                    <button
                      class="btn btn-dark dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.name}
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a class="dropdown-item" href="/profile">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/login" onClick={logOut}>
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  
                  <li class="nav-item active">
                    <a class="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
}

export default Navbar