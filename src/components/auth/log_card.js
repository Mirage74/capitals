<div className="row align-items-center">


  <div className="row align-items-end card-deck w-auto">


    <div className="card h-75">
      <div className="card-body">
        <h1 className="text-center pb-4 pt-3">
                        <span className="text-primary">
                      <i className="fas fa-lock" /> Login
                    </span>
        </h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              required
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </div>


  </div>

</div>