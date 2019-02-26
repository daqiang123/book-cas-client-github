package com.xadhsd.book.server.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.xadhsd.dhframe.controller.BaseController;
import com.xadhsd.dhframe.domain.Result;
import com.xadhsd.dhframe.enums.ResultEnum;
import com.xadhsd.dhframe.system.entity.SysUser;
import com.xadhsd.dhframe.system.repository.SysUserRepository;
import com.xadhsd.dhframe.utils.ResultUtil;
import com.xadhsd.book.server.entity.Book;
import com.xadhsd.book.server.repository.BookRepository;

/**
 *	图书控制器类
 * 
 * @author 刘宏强
 */
@RestController
@RequestMapping(path = "/book")
public class BookController extends BaseController {

	private static Logger logger = LoggerFactory.getLogger(BookController.class);

	/**
	 * 	图书存储库类
	 */
	private final BookRepository bookRepository;
	
	/**
	 * 用户存储库类
	 */
	private final SysUserRepository sysUserRepository;

	/**
	 * 	自动装配图书存储库类
	 * 
	 * @param bookRepository
	 */
	@Autowired
	BookController(BookRepository bookRepository, SysUserRepository sysUserRepository) {
		this.bookRepository = bookRepository;
		this.sysUserRepository = sysUserRepository;
	}

	/**
	 * 	查询所有图书
	 * 
	 * @param book
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST, value = "/findAll")
	public @ResponseBody Iterable<Book> findAll(@RequestBody Book book) {
		Pageable pageable = new PageRequest(book.getPageNumber(), book.getSize(), Sort.Direction.ASC,
				"bookSort");
		Specification<Book> specification = new Specification<Book>() {
			@Override
			public Predicate toPredicate(Root<Book> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
				List<Predicate> list = new ArrayList<Predicate>();
				// 查询条件存在图书名称字段中
				String bookName = book.getBookName();
				if (!StringUtils.isEmpty(bookName)) {
					// 图书名称
					list.add(cb.like(root.get("bookName").as(String.class), "%" + bookName + "%"));
					// 图书标题
					list.add(cb.like(root.get("bookTitle").as(String.class), "%" + bookName + "%"));
					// 图书作者
					list.add(cb.like(root.get("bookAuthor").as(String.class), "%" + bookName + "%"));
					// 图书译者
					list.add(cb.like(root.get("bookTranslator").as(String.class), "%" + bookName + "%"));
					return cb.or(list.toArray(new Predicate[list.size()]));
				}
				return cb.and(list.toArray(new Predicate[list.size()]));
			}
		};
        return this.bookRepository.findAll(specification, pageable);
	}
	
	/**
	 * 	查询所有状态为有效的图书
	 * 
	 * @param book
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST, value = "/findAllBookes")
	public @ResponseBody Iterable<Book> findAllBookes(@RequestBody Book book) {
		return this.bookRepository.findByBookState(true);
	}

	/**
	 *	保存图书
	 * 
	 * @param book
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/save")
	public @ResponseBody Result save(@RequestBody Book book) {
		try {
			book = (Book) this.bookRepository.save(book);
			logger.info("保存图书成功！");
			return ResultUtil.setResult(ResultEnum.ADD_SUCCESS.getCode(), ResultEnum.ADD_SUCCESS.getMsg(), book);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("保存图书失败！");
			return ResultUtil.setResult(ResultEnum.ADD_FAILURE.getCode(), ResultEnum.ADD_FAILURE.getMsg(), book);
		}
	}

	/**
	 * 	根据主键查询图书
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public @ResponseBody Result findOne(@PathVariable("id") String id) {
		Book book = new Book();
		try {
			book = this.bookRepository.findOne(id);
			logger.info("根据主键查询图书成功！");
			return ResultUtil.setResult(ResultEnum.QUERY_SUCCESS.getCode(), ResultEnum.QUERY_SUCCESS.getMsg(),
					book);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("根据主键查询图书失败！");
			return ResultUtil.setResult(ResultEnum.QUERY_FAILURE.getCode(), ResultEnum.QUERY_FAILURE.getMsg(),
					book);
		}
	}

	/**
	 * 	修改图书
	 * 
	 * @param book
	 * @return
	 */
	@RequestMapping(method = RequestMethod.PUT, value = "/update")
	public @ResponseBody Result update(@RequestBody Book book) {
		try {
			book = (Book) this.bookRepository.save(book);
			logger.info("修改图书成功！");
			return ResultUtil.setResult(ResultEnum.UPDATE_SUCCESS.getCode(), ResultEnum.UPDATE_SUCCESS.getMsg(),
					book);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("修改图书失败！");
			return ResultUtil.setResult(ResultEnum.UPDATE_FAILURE.getCode(), ResultEnum.UPDATE_FAILURE.getMsg(),
					book);
		}
	}

	/**
	 * 	根据图书主键删除图书
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public @ResponseBody Result delete(@PathVariable("id") String id) {
		try {
			this.bookRepository.delete(id);
			logger.info("根据主键删除图书成功！");
			return ResultUtil.setResult(ResultEnum.DELETE_SUCCESS.getCode(), ResultEnum.DELETE_SUCCESS.getMsg());
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("根据主键删除图书失败！");
			return ResultUtil.setResult(ResultEnum.DELETE_FAILURE.getCode(), ResultEnum.DELETE_FAILURE.getMsg());
		}
	}
	
	/**
	 * 获取当前用户
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/getCurrentUser")
	public @ResponseBody Result getCurrentUser() {
		SysUser sysUser = new SysUser();
		try {
			logger.info("getCurrentUser获取当前用户");
			String username = this.getCurrentUsername();
			logger.info("getCurrentUser获取当前用户名="+username);
			//List<SysUser> sysUserList = this.sysUserRepository.findByUsername(username);
			//sysUser = new SysUser();
			//if (sysUserList.size() > 0) {
				//sysUser = sysUserList.get(0);
			//}
			sysUser.setUsername(username);
			logger.info("根据主键查询角色成功！");
			return ResultUtil.setResult(ResultEnum.QUERY_SUCCESS.getCode(), ResultEnum.QUERY_SUCCESS.getMsg(), sysUser);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("根据主键查询角色失败！");
			return ResultUtil.setResult(ResultEnum.QUERY_FAILURE.getCode(), ResultEnum.QUERY_FAILURE.getMsg(), sysUser);
		}
	}
	
	/**
	 * 获取当前登录用户名
	 * @return
	 */
	public String getCurrentUsername() {
		
		logger.info("getCurrentUsername获取当前登录用户名");
		
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			return ((UserDetails) principal).getUsername();
		} else {
			logger.info("principal="+principal);
			return principal.toString();
		}
	}


}
