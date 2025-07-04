package com.example.service;

import com.example.entity.Goods;
import com.example.entity.GoodsStock;
import com.example.exception.CustomException;
import com.example.mapper.GoodsStockMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 业务处理
 **/
@Service
public class GoodsStockService {

    @Resource
    private GoodsStockMapper goodsStockMapper;

    @Resource
    private GoodsService goodsService;

    /**
     * 新增
     */
    @Transactional
    public void add(GoodsStock goodsStock) {
        Integer num = goodsStock.getNum();
        Goods goods = goodsService.selectById(goodsStock.getGoodsId());
        goods.setStore(goods.getStore() + num);  // 进货后的农产品数量
        goodsService.updateById(goods);  // 更新数据
        goodsStockMapper.insert(goodsStock);
    }

    /**
     * 删除
     */
    @Transactional
    public void deleteById(Integer id) {
        GoodsStock stock = goodsStockMapper.selectById(id);
        if (stock == null) {
            throw new CustomException("库存记录不存在");
        }

        Goods goods = goodsService.selectById(stock.getGoodsId());
        goods.setStore(goods.getStore() - stock.getNum());
        goodsService.updateById(goods);

        goodsStockMapper.deleteById(id);
    }

    /**
     * 修改
     */
    @Transactional
    public void updateById(GoodsStock goodsStock) {
        GoodsStock existing = goodsStockMapper.selectById(goodsStock.getId());
        if (existing == null) {
            throw new CustomException("库存记录不存在");
        }

        int diff = goodsStock.getNum() - existing.getNum();
        goodsStockMapper.updateById(goodsStock);

        if (diff != 0) {
            Goods goods = goodsService.selectById(goodsStock.getGoodsId());
            if (goods.getStore() + diff < 0) {
                throw new CustomException("库存不足，无法完成此操作");
            }
            goods.setStore(goods.getStore() + diff);
            goodsService.updateById(goods);
        }
    }

    /**
     * 根据ID查询
     */
    public GoodsStock selectById(Integer id) {
        return goodsStockMapper.selectById(id);
    }

    /**
     * 查询所有
     */
    public List<GoodsStock> selectAll(GoodsStock goodsStock) {
        return goodsStockMapper.selectAll(goodsStock);
    }

    /**
     * 分页查询
     */
    public PageInfo<GoodsStock> selectPage(GoodsStock goodsStock, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<GoodsStock> list = goodsStockMapper.selectAll(goodsStock);
        return PageInfo.of(list);
    }
    
}